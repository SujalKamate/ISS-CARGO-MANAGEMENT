# 🚀 ISS Cargo Management System

## 📌 Project Overview

The **ISS Cargo Management System** is a full-stack application designed to simulate storage, retrieval, and monitoring of cargo items aboard the International Space Station (ISS).

It provides:

* Smart item placement inside containers
* Efficient retrieval logic
* Waste and expiry tracking
* A mission-control style dashboard UI

---

## 🧠 Key Features

### 🔍 Cargo Search

* Search items by name
* Displays container location instantly

### 🧭 Smart Retrieval System

* Calculates retrieval complexity
* Shows number of blocking items
* Optimized for efficient access

### 📦 Auto Placement Engine

* Automatically assigns 4500+ items to containers
* Uses zone-based placement logic
* Simulates real storage stacking

### ♻️ Waste Monitoring

* Tracks expired items
* Displays waste items with reasons

### 🎛 Dashboard UI

* Space-themed control panel
* Interactive search and retrieval
* Real-time system feedback

---

## 🏗️ Tech Stack

### Backend

* FastAPI (Python)
* Oracle Database (Local XE)
* oracledb library

### Frontend

* React.js
* CSS (Glassmorphism + Space Theme)

---

## 📁 Project Structure

```
ISS-CARGO-MANAGEMENT/
│
├── backend/
│   ├── main.py
│   ├── db.py
│   ├── routes/
│   ├── utils/
│
├── frontend/
│   ├── src/
│   ├── public/
│
├── data/
│   ├── containers.csv
│   ├── input_items.csv
```

---

## ⚙️ Setup Instructions (LOCAL MACHINE)

### 🔹 1. Backend Setup

```bash
cd backend
pip install -r requirements.txt
```

Run server:

```bash
uvicorn main:app --reload
```

Backend runs at:

```
http://127.0.0.1:8000
```

---

### 🔹 2. Database Setup (Oracle XE)

* Ensure Oracle XE is running locally
* Update `db.py`:

```python
dsn="localhost/XE"
```

---

### 🔹 3. Load Data

```bash
python utils/load_containers.py
python utils/load_items.py
python utils/auto_place.py
```

---

### 🔹 4. Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend runs at:

```
http://localhost:3000
```

---

## 🔗 API Endpoints

| Endpoint             | Method | Description          |
| -------------------- | ------ | -------------------- |
| `/items`             | GET    | Get all items        |
| `/search/{name}`     | GET    | Search item by name  |
| `/smart-search/{id}` | GET    | Retrieval complexity |
| `/retrieve/{id}`     | POST   | Retrieve item        |
| `/waste`             | GET    | Waste items          |
| `/waste/expired`     | GET    | Expired items        |

---

## 🧪 Testing Flow

1. Open frontend
2. Search item (e.g. `food`)
3. Click:

   * Smart Locate → shows steps
   * Retrieve → removes item
4. Check waste dashboard

---

## ⚠️ Notes

* Backend uses **local Oracle DB**
* Project works only on same machine
* Not deployed to cloud (by design for demo)

---

## 🎯 Future Improvements

* Cloud deployment (Render + Vercel)
* 3D container visualization
* AI-based placement optimization
* Analytics dashboard

---

## 👨‍💻 Author

**Sujal Kamate**

---

## 🚀 Summary

This project demonstrates:

* Full-stack development
* Database design and optimization
* Backend API architecture
* Real-world system simulation
* Modern UI/UX design

---

✨ *Designed as a realistic ISS cargo control system interface*
