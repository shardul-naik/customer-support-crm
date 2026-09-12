import os
from pathlib import Path
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from dotenv import load_dotenv

BACKEND_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BACKEND_DIR / ".env")

# Uses an absolute local SQLite path so the app works from any launch directory.
default_sqlite_url = f"sqlite:///{(BACKEND_DIR / 'crm_database.db').as_posix()}"
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL", default_sqlite_url)

# Keep the convenient ``sqlite:///./...`` form in .env files, but anchor it to
# the backend directory instead of the directory from which Uvicorn was started.
if SQLALCHEMY_DATABASE_URL.startswith("sqlite:///./"):
    database_name = SQLALCHEMY_DATABASE_URL.removeprefix("sqlite:///./")
    SQLALCHEMY_DATABASE_URL = f"sqlite:///{(BACKEND_DIR / database_name).as_posix()}"

# Automatically handles PostgreSQL string formats if deployed later
if SQLALCHEMY_DATABASE_URL.startswith("postgres://"):
    SQLALCHEMY_DATABASE_URL = SQLALCHEMY_DATABASE_URL.replace("postgres://", "postgresql://", 1)

engine_kwargs = {"check_same_thread": False} if SQLALCHEMY_DATABASE_URL.startswith("sqlite") else {}

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args=engine_kwargs, pool_pre_ping=True
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
