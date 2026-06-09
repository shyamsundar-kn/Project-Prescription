# Medico-Redigo

A web app where you type in a symptom and it tells you what to do about it, how long it usually lasts, and a doctor to contact if it gets worse.

Built this with React on the frontend, Node/Express on the backend, and MongoDB to store the symptoms and remedy data. Everything runs through Docker so setup is pretty straightforward.

---

## What it does

- Register and log in with email and password
- Search for a symptom (e.g. "fever", "headache", "chest pain")
- Get back a remedy suggestion and a recommended doctor with their contact number
- Dashboard is locked behind login

---

## Stack

- **Frontend**: React 19, Vite, Bootstrap 5, React Router
- **Backend**: Node.js, Express, Mongoose
- **Database**: MongoDB
- **Infra**: Docker Compose

---

## Running it

You need Docker installed. Then:

```bash
git clone https://github.com/<your-username>/medico-redigo.git
cd medico-redigo
docker compose up --build
```

- Frontend → http://localhost
- Backend → http://localhost:3001
- MongoDB → localhost:27017

After the containers are up, seed the symptom database:

```bash
docker exec -it backend-app node seedLargeData.js
```

---

## Running without Docker

**Backend**
```bash
cd backend
npm install
node server.js
```

**Frontend**
```bash
cd frontend
npm install
npm run dev
```

Note: `src/services/api.js` uses `http://backend:3001` as the base URL (Docker internal hostname). Change it to `http://localhost:3001` when running locally.

---

## API

```
POST /signup                      create a new user
POST /login                       log in
GET  /symptoms?problem=fever      search by symptom keyword
```

Example response from `/symptoms`:
```json
[
  {
    "problem": "Fever",
    "duration": "3-5 days",
    "remedy": "Rest, stay hydrated, take paracetamol if needed",
    "doctor": {
      "name": "Dr. A. Kumar",
      "specialist": "General Physician",
      "phone": "9876543210"
    }
  }
]
```

---

## Project structure

```
prescription/
├── docker-compose.yml
├── backend/
│   ├── server.js
│   ├── seedLargeData.js
│   └── models/
│       ├── User.js
│       └── Symptom.js
└── frontend/
    └── src/
        ├── main.jsx
        ├── services/api.js
        └── components/
            ├── Login.jsx
            ├── Signup.jsx
            ├── Dashboard.jsx
            ├── SymptomForm.jsx
            └── RemedyResult.jsx
```

---

## Things to fix before production

Passwords are stored as plain text right now that needs to change before this goes anywhere public. A few other things worth addressing:

- Hash passwords with bcrypt
- Use JWT instead of the localStorage flag for auth
- Move the MongoDB URI into an environment variable
- Add some input validation on the backend
```
