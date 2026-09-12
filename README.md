```md
# SupportHub CRM

A modern full-stack customer support dashboard built to help teams create, prioritize, track, and resolve support tickets efficiently.

SupportHub CRM combines a polished React interface with a FastAPI backend and automated ticket triage. Every incoming ticket is analyzed for urgency, assigned a priority level, and given an SLA deadline automatically.

## Highlights

- Create and manage customer support tickets
- Automatic priority detection: Low, Medium, High, or Urgent
- Dynamic SLA deadlines based on ticket content
- Search tickets by ID, customer, email, subject, or description
- Filter tickets by Open, In Progress, and Closed status
- Add internal notes while updating ticket status
- Live dashboard metrics for total, open, and urgent tickets
- Responsive UI with loading states, empty states, and status badges
- SQLite database for simple local development
- REST API with FastAPI validation and interactive API docs

## Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- Axios
- Lucide React Icons

### Backend

- FastAPI
- SQLAlchemy
- Pydantic
- SQLite
- Uvicorn
- Python Dotenv

## Automated Triage

SupportHub CRM analyzes the ticket subject and description to determine priority and SLA.

| Priority | Example intent | SLA |
| --- | --- | --- |
| Urgent | `down`, `crash`, `security`, `breach`, `payment failed` | 4 hours |
| High | `bug`, `error`, `cannot access`, `refund` | 12 hours |
| Medium | `help`, `question`, `request`, `change` | 24 hours |
| Low | General requests | 48 hours |

## Project Structure

```text
customer-support-crm/
├── backend/
│   ├── app/
│   │   ├── main.py        # FastAPI routes and CORS configuration
│   │   ├── database.py    # Database connection and session handling
│   │   ├── models.py      # SQLAlchemy Ticket and Note models
│   │   ├── schemas.py     # Pydantic request/response validation
│   │   ├── crud.py        # Ticket database operations
│   │   └── triage.py      # Priority and SLA automation
│   ├── .env
│   └── requirements.txt
│
└── frontend/
    └── src/
        ├── components/    # Dashboard UI components
        ├── services/api.js
        └── App.jsx
```

## Getting Started

### 1. Start the backend

```bash
cd backend
python -m venv venv
```

Activate the virtual environment:

```bash
# Windows
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run the API:

```bash
uvicorn app.main:app --reload
```

The backend runs at:

```text
http://127.0.0.1:8000
```

Interactive API documentation is available at:

```text
http://127.0.0.1:8000/docs
```

### 2. Start the frontend

```bash
cd frontend
npm install
npm run dev
```

Open the URL shown by Vite, usually:

```text
http://localhost:5173
```

## API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/` | API health check |
| `GET` | `/api/tickets` | List, search, or filter tickets |
| `POST` | `/api/tickets` | Create a new ticket |
| `GET` | `/api/tickets/{ticket_id}` | Get ticket details |
| `PUT` | `/api/tickets/{ticket_id}` | Update ticket status or add an internal note |

## Environment Variables

Create `backend/.env`:

```env
DATABASE_URL=sqlite:///./crm_database.db
CORS_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
```

## Why SupportHub CRM?

SupportHub CRM is designed as more than a ticket list. It demonstrates how a support workflow can be improved with smart automation, clear SLA visibility, and a focused user experience—helping teams identify critical issues before they become bigger problems.
```
