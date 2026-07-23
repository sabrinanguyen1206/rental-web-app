# Rental Web App

A full-stack **rental / property-management** web application for listing rooms and shops,
scheduling viewing appointments, submitting rental applications, and managing everything
through an admin panel.

Built as a 3-tier application:

```
Vue 3 SPA (frontend)  ──HTTP/REST──►  Node.js + Express API (backend)  ──SQL──►  PostgreSQL
```

---

## Tech Stack

| Layer      | Technologies |
|------------|--------------|
| **Frontend** | Vue 3 (Composition API, `<script setup>`), Vite, Vue Router, Chart.js + vue-chartjs, lucide-vue-next, native `fetch` |
| **Backend**  | Node.js, Express 5, `pg` (node-postgres), jsonwebtoken (JWT), cors |
| **Database** | PostgreSQL 16 |
| **Tooling**  | ESLint, oxlint, Prettier, nodemon |

---

## Features

**Customer-facing**
- Browse room/shop listings with search and price-range filtering
- View room details and image galleries
- Register / log in (JWT authentication)
- Book a viewing appointment and see appointment history (with cancellation)
- Submit a detailed rental application

**Admin**
- Dashboard with Chart.js analytics (rooms, users, bookings, appointments)
- Full CRUD for rooms (including cover images)
- Manage users
- Review viewing appointments
- Approve / reject / delete rental applications

---

## Project Structure

```
rental-web-app/
├── backend/                     # Node.js + Express REST API
│   ├── config/
│   │   ├── db.js                # PostgreSQL connection pool (pg)
│   │   └── jwt.js               # JWT secret
│   ├── controllers/             # Request handlers (business logic)
│   │   ├── account.controller.js       # login / register
│   │   ├── appointment.controller.js
│   │   ├── booking.controller.js
│   │   ├── rentalRequest.controller.js
│   │   ├── rooms.controller.js
│   │   └── user.controller.js
│   ├── models/                  # SQL data-access layer (parameterized queries)
│   │   ├── account.model.js
│   │   ├── appointment.model.js
│   │   ├── booking.model.js
│   │   ├── rentalRequest.model.js
│   │   ├── rooms.model.js
│   │   └── user.model.js
│   ├── middlewares/
│   │   ├── auth.js              # JWT verification middleware
│   │   └── auth.middleware.js   # (duplicate JWT middleware)
│   ├── routes/                  # Express routers (URL → controller)
│   │   ├── account.routes.js
│   │   ├── appointment.routes.js
│   │   ├── booking.routes.js
│   │   ├── rentalRequest.routes.js
│   │   ├── rooms.routes.js
│   │   └── user.routes.js
│   ├── index.js                 # App entry point — mounts routers, starts server (port 3000)
│   └── package.json
│
├── frontend/                    # Vue 3 single-page application
│   ├── src/
│   │   ├── main.js              # App bootstrap (createApp + router)
│   │   ├── App.vue              # Root component (<router-view />)
│   │   ├── router/
│   │   │   └── index.js         # Route definitions (public + nested /admin)
│   │   ├── layout/
│   │   │   └── AdminLayout.vue  # Admin shell layout
│   │   ├── components/
│   │   │   └── RoomCard.vue
│   │   └── views/               # Page-level components
│   │       ├── HomeView.vue
│   │       ├── RoomDetailView.vue
│   │       ├── AppointmentView.vue
│   │       ├── AppointmentHistoryView.vue
│   │       ├── RegisterRoomView.vue
│   │       ├── LoginView.vue
│   │       └── admin/           # Admin pages (dashboard, rooms, users, bookings, appointments)
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── database/
    └── rental_web.sql           # PostgreSQL schema + seed data (pg_dump)
```

### How a request flows

```
Vue view (fetch)  →  routes/*.routes.js  →  [auth middleware]  →  controllers/*.controller.js  →  models/*.model.js  →  PostgreSQL
```

The backend follows an **MVC-style** separation: **routes** map URLs to handlers,
**controllers** hold request/response logic, and **models** run the SQL.

---

## Prerequisites

- **Node.js** ≥ 22.18 (or ≥ 24.12)
- **PostgreSQL** ≥ 16
- **npm**

---

## Getting Started

### 1. Clone

```sh
git clone https://github.com/sabrinanguyen1206/rental-web-app.git
cd rental-web-app
```

### 2. Set up the database

Create the database, then load the schema and seed data:

```sh
createdb quanlythuenha
psql -d quanlythuenha -f database/rental_web.sql
```

> **Note:** `backend/config/db.js` connects to a database named **`quanlythuenha`** on
> `localhost:5432`. The SQL dump was originally owned by the role `nguyenphuongngoc`.
> If you hit ownership errors, either create that role or edit the connection settings
> (below) to match your local PostgreSQL user.

Update `backend/config/db.js` with your local credentials:

```js
const pool = new Pool({
  user: "your_pg_user",
  password: "your_pg_password",
  host: "localhost",
  port: 5432,
  database: "quanlythuenha",
});
```

### 3. Start the backend API

```sh
cd backend
npm install
npm run dev      # nodemon (auto-reload) — or: npm start
```

The API runs at **http://localhost:3000**.

### 4. Start the frontend

In a second terminal:

```sh
cd frontend
npm install
npm run dev
```

Vite serves the app at **http://localhost:5173** (default). Open it in your browser.

> The frontend calls the API at the hardcoded URL `http://localhost:3000`, so keep the
> backend running on port 3000.

### 5. Log in

Use a seeded account from the sample data, e.g.:

| Role     | Email               | Password |
|----------|---------------------|----------|
| Admin    | `sabrina@gmail.com` | `123456` |
| Customer | `ngoc@gmail.com`    | `11111`  |

Admin users can access the panel at **/admin**.

---

## API Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/account/login` | Log in, returns a JWT |
| POST | `/account/register` | Register a new account |
| GET/POST/PUT/DELETE | `/users`, `/users/:id` | User CRUD |
| GET/POST/PUT/DELETE | `/rooms`, `/rooms/:id` | Room CRUD |
| GET | `/rooms/:id/images` | Room image gallery |
| GET/POST/PUT/DELETE | `/bookings`, `/bookings/:id` | Booking CRUD |
| GET/POST | `/appointments`, `/appointments/admin` | Viewing appointments |
| DELETE | `/appointments/:id` | Cancel an appointment |
| POST | `/rental-requests` | Submit a rental application |
| GET | `/rental-requests/admin` | List all applications (admin) |
| PUT | `/rental-requests/:id/approve` \| `/reject` | Approve / reject |
| DELETE | `/rental-requests/:id` | Delete an application |

Protected endpoints expect an `Authorization: Bearer <token>` header.

---

## Available Scripts

**Backend** (`backend/`)
- `npm run dev` — start with nodemon (auto-reload)
- `npm start` — start with node

**Frontend** (`frontend/`)
- `npm run dev` — Vite dev server with hot reload
- `npm run build` — production build
- `npm run preview` — preview the production build
- `npm run lint` — run oxlint + ESLint
- `npm run format` — format `src/` with Prettier

---

## Notes & Caveats

This project is a learning/portfolio build. Before any real deployment, address:

- **Passwords are stored in plaintext** — hash them (e.g. bcrypt) and compare hashes on login.
- **The JWT secret is hardcoded** in `config/jwt.js` — move it to an environment variable.
- **Admin API endpoints are not role-guarded** server-side — the JWT middleware checks that a
  user is logged in but not that they are an admin. Add a role check to admin routes.
- **The API base URL is hardcoded** (`http://localhost:3000`) throughout the frontend — extract
  it to an environment variable (e.g. `VITE_API_URL`) for different environments.
- **DB credentials** in `config/db.js` are empty by default and should be configured per machine.
```
