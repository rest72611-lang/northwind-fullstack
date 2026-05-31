# Northwind Full Stack System

Full stack application built with Node.js and React.

## Backend
REST API built using layered architecture (Controller / Service / DAL)

Features:
- Authentication with JWT
- SQL database (MySQL)
- Validation (JOI)
- File upload handling
- Centralized error handling
- Rate limiting & security middleware

## Frontend
React + TypeScript client application

Features:
- API communication
- Forms & validation
- User authentication
- Product management UI

## Run locally

### 1. Start MySQL

The real Northwind database dump is committed at `Database/MySQL/northwind.sql`.
Docker Compose mounts `Database/MySQL` into `/docker-entrypoint-initdb.d`, so MySQL imports the dump automatically the first time the database volume is created.

```bash
docker compose up -d
```

The local MySQL service uses:

- Host: `localhost`
- Port: `3306`
- Database: `northwind`
- User: `northwind_user`
- Password: `northwind_password`

If you need to re-import the SQL from scratch, remove the MySQL volume and start again:

```bash
docker compose down -v
docker compose up -d
```

### 2. Configure the backend

Create `Backend/.env` from `Backend/.env.example` and keep it local. Do not commit real secrets.

Required database variables are read by `Backend/src/2-utils/dal.ts` through `Backend/src/2-utils/app-config.ts`:

- `MYSQL_HOST`
- `MYSQL_USER`
- `MYSQL_PASSWORD`
- `MYSQL_DATABASE`
- `MYSQL_PORT`

`OPENAI_API_KEY` is only needed for RAG/OpenAI requests. Without it, the backend returns a controlled error for the RAG endpoint.

### 3. Run the backend

```bash
cd Backend
npm install
npm start
```

### 4. Run the frontend

```bash
cd Frontend
npm install
npm run dev
```

### Authentication notes

Product list, product details, top products, and out-of-stock product pages can load without logging in.
Creating or editing products requires a JWT, and deleting products requires an admin JWT. Register or login before using protected actions. The imported SQL contains roles and an empty `users` table, so local users are created through the app.

Registration uses Google reCAPTCHA. Configure `VITE_RECAPTCHA_SITE_KEY` in the frontend environment and `RECAPTCHA_SECRET_KEY` in `Backend/.env` if you want to use the registration flow locally.

### RAG page

To test the RAG page, set `OPENAI_API_KEY` in `Backend/.env`, start the backend, then open the RAG page from the frontend. Requests go from React to the backend endpoint at `POST http://localhost:4000/api/rag`; the OpenAI key is never used in the browser.
