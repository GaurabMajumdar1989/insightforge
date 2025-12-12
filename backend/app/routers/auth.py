from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.deps import get_db
from app.schemas.user_schemas import UserCreate, LoginRequest, UserRead, TokenResponse, RefreshRequest
from app.services.auth_service import AuthService
from app.models.user import User
from app.auth_deps import get_current_user

router = APIRouter(prefix="/auth", tags=["Auth"])


# ---------- SIGNUP ----------
@router.post("/signup", response_model=UserRead)
def signup(user_data: UserCreate, db: Session = Depends(get_db)):

    # Check if user exists
    existing_user = AuthService.get_user_by_email(db, user_data.email)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered."
        )

    # Create user
    new_user = AuthService.create_user(
        db=db,
        email=user_data.email,
        password=user_data.password,
        full_name=user_data.full_name
    )

    return new_user


# ---------- LOGIN ----------
@router.post("/login", response_model=TokenResponse)
def login(credentials: LoginRequest, db: Session = Depends(get_db)):

    user = AuthService.get_user_by_email(db, credentials.email)
    if not user:
        raise HTTPException(status_code=400, detail="Invalid credentials.")

    if not AuthService.verify_password(credentials.password, user.hashed_password): # type: ignore[attr-defined]
        raise HTTPException(status_code=400, detail="Invalid credentials.")

    # Create tokens
    access_token = AuthService.create_access_token({"sub": str(user.id)})
    refresh_token = AuthService.create_refresh_token({"sub": str(user.id)})

    return TokenResponse(
        access_token=access_token,
        refresh_token=refresh_token
    )


# ---------- REFRESH TOKEN ----------
@router.post("/refresh", response_model=TokenResponse)
#def refresh(token: str):
def refresh(body: RefreshRequest):
    payload = AuthService.verify_refresh_token(body.token)
    user_id = payload.get("sub")

    new_access = AuthService.create_access_token({"sub": user_id})
    new_refresh = AuthService.create_refresh_token({"sub": user_id})

    return TokenResponse(
        access_token=new_access,
        refresh_token=new_refresh
    )


# ---------- GET CURRENT USER ----------
@router.get("/me", response_model=UserRead)
def get_me(current_user: User = Depends(get_current_user)):
    return current_user
