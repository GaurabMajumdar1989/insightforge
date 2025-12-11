from datetime import datetime, timedelta
from typing import Optional
import bcrypt
import jwt
from fastapi import HTTPException, status
from app.models.user import User
from sqlalchemy.orm import Session

# Secret keys (later move to .env)
ACCESS_SECRET = "YOUR_ACCESS_SECRET_KEY"
REFRESH_SECRET = "YOUR_REFRESH_SECRET_KEY"

ALGORITHM = "HS256"
ACCESS_EXPIRE_MINUTES = 15
REFRESH_EXPIRE_DAYS = 7


class AuthService:

    # ---------- PASSWORD HASHING ----------
    @staticmethod
    def hash_password(password: str) -> str:
        return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode()

    @staticmethod
    def verify_password(password: str, hashed_password: str) -> bool:
        return bcrypt.checkpw(password.encode("utf-8"), hashed_password.encode())


    # ---------- TOKEN CREATION ----------
    @staticmethod
    def create_access_token(data: dict) -> str:
        to_encode = data.copy()
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_EXPIRE_MINUTES)
        to_encode.update({"exp": expire})
        return jwt.encode(to_encode, ACCESS_SECRET, algorithm=ALGORITHM)

    @staticmethod
    def create_refresh_token(data: dict) -> str:
        to_encode = data.copy()
        expire = datetime.utcnow() + timedelta(days=REFRESH_EXPIRE_DAYS)
        to_encode.update({"exp": expire})
        return jwt.encode(to_encode, REFRESH_SECRET, algorithm=ALGORITHM)


    # ---------- TOKEN VERIFICATION ----------
    @staticmethod
    def verify_access_token(token: str) -> dict:
        try:
            return jwt.decode(token, ACCESS_SECRET, algorithms=[ALGORITHM])
        except jwt.ExpiredSignatureError:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Access token expired.")
        except jwt.InvalidTokenError:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid access token.")

    @staticmethod
    def verify_refresh_token(token: str) -> dict:
        try:
            return jwt.decode(token, REFRESH_SECRET, algorithms=[ALGORITHM])
        except jwt.ExpiredSignatureError:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Refresh token expired.")
        except jwt.InvalidTokenError:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid refresh token.")


    # ---------- DATABASE OPERATIONS ----------
    @staticmethod
    def get_user_by_email(db: Session, email: str) -> Optional[User]:
        return db.query(User).filter(User.email == email).first()

    @staticmethod
    def create_user(db: Session, email: str, password: str, full_name: Optional[str] = None) -> User:
        hashed = AuthService.hash_password(password)
        new_user = User(email=email, hashed_password=hashed, full_name=full_name)
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return new_user
