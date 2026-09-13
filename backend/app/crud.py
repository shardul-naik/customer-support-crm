import uuid
from typing import List, Optional
from sqlalchemy.orm import Session
from sqlalchemy import or_
from app.models import Ticket, Note, TicketStatus
from app.schemas import TicketCreate, TicketUpdate
from app.triage import analyze_ticket_priority_and_sla

def generate_ticket_id() -> str:
    """Generate an ID that remains unique even when tickets are deleted."""
    return f"TKT-{uuid.uuid4().hex[:10].upper()}"

def create_ticket(db: Session, ticket_data: TicketCreate) -> Ticket:
    ticket_id = generate_ticket_id()
    priority, sla_deadline = analyze_ticket_priority_and_sla(
        ticket_data.subject, ticket_data.description
    )

    db_ticket = Ticket(
        id=ticket_id,
        customer_name=ticket_data.customer_name,
        customer_email=ticket_data.customer_email,
        subject=ticket_data.subject,
        description=ticket_data.description,
        status=TicketStatus.OPEN,
        priority=priority,
        sla_deadline=sla_deadline,
    )
    db.add(db_ticket)
    db.commit()
    db.refresh(db_ticket)
    return db_ticket

def get_tickets(
    db: Session, status: Optional[TicketStatus] = None, search: Optional[str] = None
) -> List[Ticket]:
    query = db.query(Ticket)

    if status:
        query = query.filter(Ticket.status == status)

    if search:
        search_fmt = f"%{search}%"
        query = query.filter(
            or_(
                Ticket.id.ilike(search_fmt),
                Ticket.customer_name.ilike(search_fmt),
                Ticket.customer_email.ilike(search_fmt),
                Ticket.subject.ilike(search_fmt),
                Ticket.description.ilike(search_fmt),
            )
        )

    return query.order_by(Ticket.created_at.desc()).all()

def get_ticket_by_id(db: Session, ticket_id: str) -> Optional[Ticket]:
    return db.query(Ticket).filter(Ticket.id == ticket_id).first()

def update_ticket(
    db: Session, ticket_id: str, update_data: TicketUpdate
) -> Optional[Ticket]:
    db_ticket = get_ticket_by_id(db, ticket_id)
    if not db_ticket:
        return None

    new_status = update_data.status
    if new_status is not None:
        setattr(db_ticket, "status", new_status)

    if update_data.note_text:
        note_id = f"NOTE-{uuid.uuid4().hex[:8].upper()}"
        new_note = Note(
            id=note_id, ticket_id=ticket_id, note_text=update_data.note_text
        )
        db.add(new_note)

    db.commit()
    db.refresh(db_ticket)
    return db_ticket
