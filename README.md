# Cricket Scoring App – Documentation

## Overview

The **Cricket Scoring App** provides a backend and frontend system for managing cricket matches and live commentary. It allows users to:

- Start and manage cricket matches
- Add live commentary for each ball
- View match details and commentary in real-time
- Broadcast commentary updates to all connected clients using **Socket.IO**

The backend is built using **NestJS, MongoDB, Redis, and Socket.IO**, and the frontend is built using **React**.

---

## Technology Stack

**Backend**

- NestJS (Node.js framework)
- MongoDB with Mongoose
- Socket.IO for real-time updates

**Frontend**

- React with React Router
- Fetch API for communication with backend
- Live commentary display with automatic state update

---

## Backend Setup

### 1. Clone Repository

```bash
git clone <your-repo-url>
cd cricket-scoring-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file at the project root:

```
MONGO_URI=mongodb://localhost:27017/cricket-scoring-app
```

### 4. Run Backend

```bash
npm run start:dev
```

The backend will run at `http://localhost:3000`.

---

## Frontend Setup

### 1. Navigate to Frontend

```bash
cd frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Frontend

```bash
npm run dev
```

The frontend runs at `http://localhost:5173` (or default 3000 if backend uses a different port). Ensure the backend port is configured correctly in `package.json` proxy or environment.

---

## API Documentation

### Start a Match

**Endpoint**

```
POST /matches/start
```

**Request Body**

```json
{
  "teamA": "India",
  "teamB": "Australia"
}
```

**Response**

```json
{
  "_id": "64fa3e1...",
  "teamA": "India",
  "teamB": "Australia",
  "matchId": 1000
}
```

**Curl Example**

```bash
curl -X POST http://localhost:3000/matches/start \
  -H "Content-Type: application/json" \
  -d '{"teamA":"India","teamB":"Australia"}'
```

---

### Add Commentary

**Endpoint**

```
POST /matches/:id/commentary
```

**Request Body**

```json
{
  "over": 1,
  "ball": 2,
  "eventType": "FOUR",
  "runs": 4,
  "text": "Beautiful shot!"
}
```

**Response**

```json
{
  "_id": "64fa3f...",
  "matchId": 1000,
  "over": 1,
  "ball": 2,
  "eventType": "FOUR",
  "runs": 4,
  "text": "Beautiful shot!"
}
```

**Curl Example**

```bash
curl -X POST http://localhost:3000/matches/1000/commentary \
  -H "Content-Type: application/json" \
  -d '{"over":1,"ball":2,"eventType":"FOUR","runs":4,"text":"Beautiful shot!"}'
```

---

### Get Match Details

**Endpoint**

```
GET /matches/:id
```

**Response**

```json
{
  "match": {
    "teamA": "India",
    "teamB": "Australia",
    "matchId": 1000
  },
  "commentary": [
    {
      "over": 1,
      "ball": 2,
      "eventType": "FOUR",
      "runs": 4,
      "text": "Beautiful shot!"
    }
  ]
}
```

**Curl Example**

```bash
curl http://localhost:3000/matches/1000
```

---

### Get All Matches

**Endpoint**

```
GET /matches
```

**Response**

```json
[
  { "teamA": "India", "teamB": "Australia", "matchId": 1000 },
  { "teamA": "England", "teamB": "Pakistan", "matchId": 1001 }
]
```

**Curl Example**

```bash
curl http://localhost:3000/matches
```

---

## Real-Time Updates

The backend broadcasts **live commentary updates** via **Socket.IO**. Clients can subscribe to the `commentaryUpdate` event.

**Client Example**

```js
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

socket.on('commentaryUpdate', (data) => {
  console.log('Live commentary received:', data);
});
```

When a new commentary is added, all connected clients receive it immediately.

---

## Development Notes

- Match IDs are auto-incremented starting from 1000.
- Redis allows multiple backend instances to broadcast events reliably.
- MongoDB stores matches and commentary history.
- Frontend automatically updates commentary list without page refresh.
- Over and ball numbers are calculated dynamically on the frontend.

---

## Deliverables

- Backend REST APIs: start match, add commentary, get match, get all matches
- Frontend React interface for live match tracking
- Real-time commentary broadcasting with Socket.IO
- MongoDB persistence and Redis pub/sub support
