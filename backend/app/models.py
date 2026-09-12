import enum
from datetime import datetime
from sqlalchemy import Column, String, Text, DateTime, Enum as SQLEnum, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.database import Base

class TicketStatus(str, enum.Enum):
    OPEN = "Open"
    IN_PROGRESS = "In Progress"
    CLOSED = "Closed"

class TicketPriority(str, enum.Enum):
    LOW = "Low"
    MEDIUM = "Medium"
    HIGH = "High"
    URGENT = "Urgent"

class Ticket(Base):
    __tablename__ = "tickets"

    id = Column(String, primary_key=True, index=True)  # Unique ticket ID (e.g., TKT-1001)
    customer_name = Column(String, nullable=False, index=True)
    customer_email = Column(String, nullable=False, index=True)
    subject = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    status: Mapped[TicketStatus] = mapped_column(
        SQLEnum(TicketStatus), default=TicketStatus.OPEN, nullable=False, index=True
    )
    priority = Column(SQLEnum(TicketPriority), default=TicketPriority.MEDIUM, nullable=False, index=True)
    sla_deadline = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    # Relationship to optional notes table
    notes = relationship("Note", back_populates="ticket", cascade="all, delete-orphan", order_by="Note.created_at")

class Note(Base):
    __tablename__ = "notes"

    id = Column(String, primary_key=True, index=True)
    ticket_id = Column(String, ForeignKey("tickets.id"), nullable=False)
    note_text = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    ticket = relationship("Ticket", back_populates="notes")
