from datetime import datetime
from typing import Annotated, List, Optional
from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator
from app.models import TicketStatus, TicketPriority

# --- NOTE SCHEMAS ---
class NoteBase(BaseModel):
    note_text: Annotated[str, Field(min_length=1, max_length=5_000)]

    @field_validator("note_text")
    @classmethod
    def strip_note_text(cls, value: str) -> str:
        value = value.strip()
        if not value:
            raise ValueError("Note text cannot be blank.")
        return value

class NoteCreate(NoteBase):
    pass

class NoteResponse(NoteBase):
    id: str
    ticket_id: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

# --- TICKET SCHEMAS ---
class TicketCreate(BaseModel):
    customer_name: Annotated[str, Field(min_length=1, max_length=120)]
    customer_email: EmailStr
    subject: Annotated[str, Field(min_length=1, max_length=200)]
    description: Annotated[str, Field(min_length=1, max_length=10_000)]

    @field_validator("customer_name", "subject", "description")
    @classmethod
    def strip_required_text(cls, value: str) -> str:
        value = value.strip()
        if not value:
            raise ValueError("This field cannot be blank.")
        return value

class TicketUpdate(BaseModel):
    status: Optional[TicketStatus] = None
    note_text: Optional[str] = None  # Allows updating status and adding a note in one request

    @field_validator("note_text")
    @classmethod
    def strip_optional_note_text(cls, value: Optional[str]) -> Optional[str]:
        if value is None:
            return None
        value = value.strip()
        if not value:
            raise ValueError("Note text cannot be blank.")
        if len(value) > 5_000:
            raise ValueError("Note text must not exceed 5,000 characters.")
        return value

class TicketResponse(BaseModel):
    id: str
    customer_name: str
    customer_email: str
    subject: str
    description: str
    status: TicketStatus
    priority: TicketPriority
    sla_deadline: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime
    notes: List[NoteResponse] = Field(default_factory=list)

    model_config = ConfigDict(from_attributes=True)
