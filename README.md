# ISS Cargo Management System 🚀

A comprehensive Cargo Management System designed for the International Space Station (ISS), featuring a FastAPI backend, Oracle Database integration, and a sleek frontend interface for tracking, placement, and retrieval of cargo items.

## 🛠 Tech Stack

- **Backend:** FastAPI (Python)
- **Database:** Oracle Database (XE)
- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Database Driver:** `cx_Oracle`

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Python 3.8+](https://www.python.org/downloads/)
- [Oracle Database XE](https://www.oracle.com/database/technologies/xe-downloads.html)
- [Oracle Instant Client](https://www.oracle.com/database/technologies/instant-client.html) (Required for `cx_Oracle`)

---

## 🚀 Getting Started

### 1. Database Setup
1. Open your Oracle SQL developer or SQL*Plus.
2. Connect to your local instance (default: `localhost/XE`).
3. Execute the SQL scripts in the following order:
   - `database/schema.sql` (Creates tables)
   - `database/triggers.sql` (Sets up automation)
   - `database/procedures.sql` (Business logic)
   - `database/insert_data.sql` (Sample data)

### 2. Backend Setup
1. Navigate to the project root directory.
2. Install the required Python packages:
   ```bash
   pip install -r requirements.txt
   ```
3. (Optional) Update database credentials in `backend/db.py`:
   ```python
   user="system",
   password="your_password",
   dsn="localhost/XE"
   ```
4. Run the FastAPI server:
   ```bash
   cd backend
   uvicorn main:app --reload
   ```
   The backend will be available at `http://127.0.0.1:8000`.

### 3. Frontend Setup
1. Simply open `frontend/index.html` in your favorite web browser.
2. Alternatively, use a Live Server (like the VS Code extension) to serve the `frontend` directory.

---

## 📂 Project Structure

```text
ISS-CARGO-MANAGEMENT/
├── backend/            # FastAPI Application
│   ├── routes/         # API Route Handlers
│   ├── main.py         # App Entry Point
│   ├── db.py           # Database Connection Logic
│   └── models.py       # Pydantic Models
├── database/           # SQL Scripts
│   ├── schema.sql      # Table Definitions
│   ├── triggers.sql    # Database Triggers
│   └── procedures.sql  # Stored Procedures
├── frontend/           # Web Interface
│   ├── index.html      # Main Dashboard
│   ├── style.css       # Custom Styling
│   └── script.js       # API Integration
└── requirements.txt    # Python Dependencies
```

## ✨ Key Features

- **Inventory Tracking:** Real-time visibility of cargo items.
- **Smart Placement:** Optimized storage logic for containers.
- **Expiry Management:** Automatic waste tracking for expired items.
- **Procedural Retrieval:** Streamlined item extraction from storage.

---

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.