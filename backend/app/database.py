#from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from app.config.settings import settings

##### Converting Asynchronous db call to Synchronous since LLm calls are already async at FastAPI endpoints.

DATABASE_URL = settings.DATABASE_URL

if not DATABASE_URL:
	raise ValueError("DATABASE_URL is not configured")

#Async Engine:
#engine = create_async_engine(DATABASE_URL, future=True, echo=False)

# Asynchronous Session:
# AsyncSessionLocal = sessionmaker(
#     bind=engine,
#     expire_on_commit=False,
#     class_=AsyncSession
# )

# Sync engine
engine = create_engine(DATABASE_URL, echo=False)

# Sync SessionLocal
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)

Base = declarative_base()
