
---

## ✅ README – Backend (`client-task-tracker-backend`)


# Client Task Tracker – Backend

This is the backend for the **Client Task Tracker** application, built using **Node.js**, **Express.js**, and **PostgreSQL** (via Supabase).

## 🌐 Live URL

Hosted on [Railway](https://railway.app)  
👉 **(https://clienttasktrackerexpressback-production.up.railway.app/)**

## ⚙️ Technologies

- **Node.js** + **Express**
- **PostgreSQL (Supabase)**
- **CORS** and **dotenv** configured
- **RESTful API** design

## 🗃️ Features

- CRUD APIs for:
  - Clients
  - Projects (with client linkage)
  - Tasks (linked to projects)
- Controller + Route separation
- Clean code structure

## 🛠️ Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/your-username/client-task-tracker-backend.git
cd client-task-tracker-backend

# 2. Install dependencies
npm install

# 3. Set environment variables
touch .env

# Add environment variables
PORT=3000
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# 4. Start the server
npm run dev
