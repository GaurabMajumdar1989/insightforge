#### SYNCHRONOUS DB CALLS ##########

from sqlalchemy.orm import Session
from app.database import SessionLocal

def get_db():
    db: Session = SessionLocal()
    try:
        yield db
    finally:
        db.close()

#########  ASYNCHRONOUS DB CALLS ##########
# from typing import AsyncGenerator
# from app.database import AsyncSessionLocal

# async def get_db() -> AsyncGenerator:
#     async with AsyncSessionLocal() as session: 
#         yield session
