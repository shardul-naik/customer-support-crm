import os
from typing import List, Optional
from fastapi import FastAPI, Depends, HTTPException, Query, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from app.database import engine, Base, get_db
from app.models import TicketStatus
from app.schemas import TicketCreate, TicketUpdate, TicketResponse
import app.crud as crud

# Create database tables automatically on startup
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Customer Support CRM API",
    description="Backend API for managing support tickets and SLA tracking.",
    version="1.0.0",
)

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv(
        "CORS_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173"
    ).split(","),
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/", tags=["Health"])
def root():
    return {"message": "Customer Support CRM API is running."}

# 1. CREATE TICKET
@app.post(
    "/api/tickets",
    response_model=TicketResponse,
    status_code=status.HTTP_201_CREATED,
    tags=["Tickets"],
)
def create_ticket(ticket: TicketCreate, db: Session = Depends(get_db)):
    """Create a new support ticket with automated priority and SLA calculation."""
    return crud.create_ticket(db=db, ticket_data=ticket)

# 2. LIST ALL TICKETS (WITH SEARCH & FILTER)
@app.get("/api/tickets", response_model=List[TicketResponse], tags=["Tickets"])
def list_tickets(
    status: Optional[TicketStatus] = Query(None, description="Filter by ticket status"),
    search: Optional[str] = Query(None, description="Search across ID, name, email, subject, description"),
    db: Session = Depends(get_db),
):
    """Retrieve all tickets with optional status filtering and search functionality."""
    return crud.get_tickets(db=db, status=status, search=search)

# 3. VIEW TICKET DETAILS
@app.get("/api/tickets/{ticket_id}", response_model=TicketResponse, tags=["Tickets"])
def get_ticket(ticket_id: str, db: Session = Depends(get_db)):
    """Fetch details for a specific ticket including notes."""
    db_ticket = crud.get_ticket_by_id(db=db, ticket_id=ticket_id)
    if not db_ticket:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Ticket with ID '{ticket_id}' not found.",
        )
    return db_ticket

# 4. UPDATE TICKET STATUS & ADD NOTES
@app.put("/api/tickets/{ticket_id}", response_model=TicketResponse, tags=["Tickets"])
def update_ticket(
    ticket_id: str, payload: TicketUpdate, db: Session = Depends(get_db)
):
    """Update ticket status and/or append internal notes."""
    updated_ticket = crud.update_ticket(db=db, ticket_id=ticket_id, update_data=payload)
    if not updated_ticket:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Ticket with ID '{ticket_id}' not found.",
        )
    return updated_ticket
