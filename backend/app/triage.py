from datetime import datetime, timedelta
from app.models import TicketPriority

def analyze_ticket_priority_and_sla(subject: str, description: str):
    """
    Standout Feature: Automated Priority Triage & Dynamic SLA Calculation.
    Scans ticket subject and description for critical intent keywords.
    """
    text = (subject + " " + description).lower()
    
    # Priority keyword rules
    urgent_keywords = ["urgent", "down", "crash", "critical", "broken", "security", "breach", "payment failed"]
    high_keywords = ["bug", "error", "failed", "cannot access", "stuck", "issue", "refund"]
    medium_keywords = ["help", "how to", "question", "update", "request", "change"]
    
    # Rule matching
    if any(keyword in text for keyword in urgent_keywords):
        priority = TicketPriority.URGENT
        hours_to_resolve = 4  # 4-hour SLA
    elif any(keyword in text for keyword in high_keywords):
        priority = TicketPriority.HIGH
        hours_to_resolve = 12 # 12-hour SLA
    elif any(keyword in text for keyword in medium_keywords):
        priority = TicketPriority.MEDIUM
        hours_to_resolve = 24 # 24-hour SLA
    else:
        priority = TicketPriority.LOW
        hours_to_resolve = 48 # 48-hour SLA
        
    sla_deadline = datetime.utcnow() + timedelta(hours=hours_to_resolve)
    
    return priority, sla_deadline