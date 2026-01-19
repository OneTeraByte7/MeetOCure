# MeetOCure

![healthcre](https://img.shields.io/badge/healthcre-yes-blue?style=for-the-badge)
![Python](https://img.shields.io/badge/Python-3.8%2B-brightgreen?style=for-the-badge)
![ML](https://img.shields.io/badge/ML-integrated-orange?style=for-the-badge)
![Typscript](https://img.shields.io/badge/Typscript-partial-blueviolet?style=for-the-badge)
![startaup](https://img.shields.io/badge/startaup-active-yellow?style=for-the-badge)
![COmpleted](https://img.shields.io/badge/COmpleted-Yes-lightgrey?style=for-the-badge)
![Live](https://img.shields.io/badge/Live-partial-green?style=for-the-badge)

> MeetOCure is a full-stack appointment and telehealth platform prototype with a React + Vite frontend, an Express.js backend API, and a Python-powered chatbot component. It provides user authentication, appointment booking, availability management, and an AI chatbot helper backed by a local Chroma DB snapshot.

---

## Project overview

`MeetOCure` is designed as a doctor–patient appointment management and telehealth helper. The repository contains:

- A React-based frontend app built with Vite ([frontend-ankit](frontend-ankit)).
- An Express-based backend API serving routes for authentication, appointments, availability, chat, doctors, hospitals, and more ([server](server)).
- A simple Python chatbot component that uses a local Chroma DB snapshot for knowledge retrieval (ChatBot/).

This README summarizes how to run each piece locally and how they interact.

## Key features

- User authentication (JWT-based)
- Doctor availability management and appointment booking
- Search routes for doctors and hospitals
- Chat functionality and AI assistant integration
- Basic notifications and appointment listing UI

## Repository structure

- [ChatBot](ChatBot): Python chatbot script and dependencies.
- [chroma_db2](chroma_db2): local Chroma sqlite snapshot used by the chatbot.
- [frontend-ankit](frontend-ankit): React + Vite frontend app (UI components, pages).
- [server](server): Node/Express backend, routes, controllers, models, and middleware.

Key files:

- Frontend entry: [frontend-ankit/package.json](frontend-ankit/package.json)
- Backend entry: [server/server.js](server/server.js)
- Backend DB config: [server/config/db.js](server/config/db.js)
- Chatbot requirements: [ChatBot/requirement.txt](ChatBot/requirement.txt)
- Local Chroma DB snapshot: [chroma_db2/chroma.sqlite3](chroma_db2/chroma.sqlite3)

## API Endpoints (summary)

The backend API mounts routes under `/api/*`. Below is a concise list of endpoints, HTTP methods, auth requirements, and common query/body parameters.
```bash
- **Auth** `/api/auth`
	- `POST /send-otp` — body: `{ phone }` — sends OTP (public)
	- `POST /verify-otp` — body: `{ phone, otp }` — verifies OTP (public)
	- `POST /check-phone` — body: `{ phone }` — checks registration (public)
	- `POST /register` — multipart form (doctor may upload `certificate`) — registers user (public)
```

- **Appointments** `/api/appointments`
	- `POST /` — book appointment — protected: `patient` — body: `{ doctorId, date, time, reason, patientInfo? }`
	- `GET /my` — get patient appointments — protected: `patient`
	- `GET /doctor` — get doctor's appointments — protected: `doctor`
	- `PUT /:id/status` — update appointment status — protected: `doctor` — body: `{ status }`

- **Slots** `/api/slots`
	- `POST /` — set doctor slots — protected: `doctor` — body: `{ date, availableSlots: [...] }`
	- `GET /` — get authenticated doctor's slots — protected: `doctor`
	- `GET /:doctorId` — get slots for a specific doctor — public (used by patients)

- **Availability** `/api/availability`
	- `POST /` — set availability (doctor) — protected: `doctor` — body: `{ days: [{ date, slots: [...] }, ...] }`
	- `GET /:doctorId` — get availability for a doctor — public
	- `DELETE /:date` — delete availability date — protected: `doctor`

- **Hospitals** `/api/hospitals`
	- `POST /` — create hospital — protected: `doctor` — body includes `{ name, location, category, ... }`
	- `GET /` — list hospitals — public
	- `GET /:id` — get hospital details — public
	- `GET /filter` — filter hospitals via query params e.g. `?city=...&department=...`
	- `GET /nearby` — query `?lat=..&lng=..&maxDistance=..`

- **Doctor** `/api/doctor`
	- `GET /profile` — get doctor profile — protected: `doctor`
	- `PUT /profile` — update doctor profile — protected: `doctor`
	- `GET /` — filtered doctors list — protected: `patient|doctor|admin` — supports query params like `specilaization`, `minExperience`

- **Patient** `/api/patient`
	- `GET /profile` — get patient profile — protected: `patient`
	- `PUT /profile` — update patient profile — protected: `patient`
	- `GET /` — filtered patients (used by doctor) — protected: `doctor`

- **Search** `/api/search`
	- `GET /` — public search across doctors and hospitals — supports `?keyword=&category=&location=&minExperience=`

- **Doc & Hosp quick search** `/api/doc&hosp`
	- `GET /doctors` — protected: `patient` — query filters for doctors
	- `GET /hospitals` — protected: `patient` — query filters for hospitals

Notes:
- The chat route (`/api/chat`) exists in `server/routes/chatRoutes.js` but is not currently mounted in `server/server.js` (it's commented out). The chat controller proxies to an external Flask AI service. Separately, there is a local Python chatbot under `ChatBot/` that uses the `chroma_db2` snapshot.
- Authentication uses JWTs and role-based protection via `server/middleware/authMiddleware.js` — protect middleware is applied in routes.


## Tech stack

- Frontend: React (Vite), Tailwind CSS
- Backend: Node.js, Express, Mongoose (MongoDB)
- Chatbot: Python (requirements listed in `ChatBot/requirement.txt`), Chroma local DB (sqlite)

## Prerequisites

- Node.js (v16+ recommended) and npm/yarn
- Python 3.8+
- MongoDB (local or hosted Atlas instance)
- (Optional) Git for cloning and branch workflows

## Setup & run (development)

Follow these steps to run the project locally. Each component runs independently and communicates via the API.

### Backend (API)

1. Open a terminal and go to the `server` folder:

```bash
cd server
```

2. Install dependencies and start the server:

```bash
npm install
# dev: (if a dev script exists) npm run dev
node server.js
```

3. The server listens on the port configured via `PORT` (see Environment variables). Default is usually `5000`.

The backend routes are organized under `server/routes/` (for example, `authRoutes.js`, `appointmentRoutes.js`, etc.). See [server/server.js](server/server.js) to confirm the mounted route prefixes.

### Frontend (Web app)

1. Open a separate terminal and go to the frontend folder:

```bash
cd frontend-ankit
```

2. Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

3. The Vite dev server will launch and expose the web UI (usually at `http://localhost:5173`). Configure the frontend to point at your backend API base URL with the appropriate environment configuration if needed.

### Chatbot (Python)

The small chatbot lives in `ChatBot` and uses a local Chroma sqlite DB snapshot in `chroma_db2`.

1. Create and activate a Python virtual environment:

```bash
cd ChatBot
python -m venv .venv
# Windows
.venv\Scripts\activate
# macOS / Linux
source .venv/bin/activate
```

2. Install Python dependencies:

```bash
pip install -r requirement.txt
```

3. Run the chatbot script:

```bash
python chatbot.py
```

Notes: The chatbot will read the local sqlite file at `chroma_db2/chroma.sqlite3` if configured to do so. If you modify the DB path, update the script configuration accordingly.

## Environment variables

Create a `.env` file in the `server` folder with values similar to:

```
MONGO_URI=your_mongo_connection_string
JWT_SECRET=some_jwt_secret
PORT=5000
```

The backend reads the DB connection and auth secret from environment variables in [server/config/db.js](server/config/db.js) and the auth middleware.

## Database notes

- The Node backend expects a MongoDB database (local or Atlas). Models are in `server/models` (e.g., `User.js`, `Appointment.js`).
- A snapshot `chroma_db2/chroma.sqlite3` is included for the chatbot; this is a read-only snapshot used for local testing and development.

## Deployment tips

- Backend: containerize the server or deploy to any Node hosting provider. Ensure `MONGO_URI` and `JWT_SECRET` are set in your hosting environment.
- Frontend: build the Vite app with `npm run build` and host on static hosting (Netlify, Vercel, or serve via a CDN).
- Chatbot: ensure Python environment and the sqlite file are available in the runtime environment; consider converting to a hosted knowledge store if scaling.

## Contributing

Contributions welcome. Suggested workflow:

1. Fork the repository and create a feature branch.
2. Implement changes and add tests where applicable.
3. Open a pull request with a clear description.

Please follow the existing code style and keep changes focused.

## License & contact

This repository currently does not contain a specific license file—add `LICENSE` to set a license for the project.

For questions or collaboration: open an issue or contact the maintainer via the repository platform.

---

If you want, I can:

- Add example `.env.example` for the backend.
- Add a short quickstart script to run all components locally with one command.
- Create a basic `LICENSE` file.

Which of these should I do next?
