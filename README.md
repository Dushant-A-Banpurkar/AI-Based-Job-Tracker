# AI-Based Job Tracker

AI-Based Job Tracker is a full-stack web application for organizing a job search and comparing a resume with a specific job description. Users can create an account, record and update job applications, upload a PDF resume, and review AI-generated resume analysis and previous results.

## Features

- Account registration and sign-in, with session cookies
- Create, view, and update job application records
- Upload a PDF resume with a company, role, and job description
- Extract resume text and request an AI-powered match analysis
- View analysis results and analysis history
- Responsive React interface

## Technology

| Area | Tools |
| --- | --- |
| Frontend | React 19, TypeScript, Vite, React Router, TanStack Query, Tailwind CSS |
| Backend | Node.js, Express 5, Mongoose, JWT, bcrypt |
| Data and services | MongoDB, Redis, OpenAI API |

The repository contains two independently installed applications: `frontend/` and `backend/`.

## Requirements

- Node.js 20.19+ (or 22.12+) and npm
- A MongoDB database
- A Redis instance
- An OpenAI API key

You will also need credentials for the services you configure. Do not commit `.env` files, API keys, or production secrets.

## Installation

Clone the repository and install dependencies for each application:

```bash
git clone https://github.com/Dushant-A-Banpurkar/AI-Based-Job-Tracker.git
cd AI-Based-Job-Tracker

cd backend
npm install
cd ../frontend
npm install
cd ..
```

### Configure the backend

Create `backend/.env` with the following values. Use a backend port other than the frontend's Vite port; the example uses `5000`.

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/ai-job-tracker
JWT_SECRET=replace-with-a-long-random-secret
JWT_EXPIRE=7d
REDIS_URL=redis://127.0.0.1:6379
OPENAI_API_KEY=replace-with-your-openai-api-key
NODE_ENV=development
```

`MONGODB_URI`, `JWT_SECRET`, `REDIS_URL`, and `OPENAI_API_KEY` are required by the backend at startup. `PORT` defaults to `4000`, `JWT_EXPIRE` defaults to `7d`, and `NODE_ENV` defaults to `development`.

If you configure the optional S3 integration, also provide `AWS_ACCESS_KEY`, `AWS_SECRET_KEY`, `AWS_REGION`, and `AWS_S3_BUCKET`. These are not required for the current in-memory PDF extraction flow.

### Configure the frontend

Create `frontend/.env`:

```env
VITE_BACKEND_API=http://localhost:5000
```

Set this to the backend origin, without an `/api` suffix. Vite serves the frontend at `http://localhost:4000` by default.

## Usage

Start each application in a separate terminal from the repository root.

**Backend**

```bash
cd backend
npm run dev
```

The API starts at `http://localhost:5000` with the configuration above.

**Frontend**

```bash
cd frontend
npm run dev
```

Open `http://localhost:4000`, register or sign in, and then:

1. Add a job application with the available application form.
2. View your applications and update a record when its details or status change.
3. Open the resume analyzer, upload a PDF, and enter the company, role, and job description.
4. Submit the analysis and review the result. Use the history view to revisit previous analyses.

Resume text and job-description data are stored by the application and sent to OpenAI for analysis. Only use documents and data you are comfortable processing through those services.

### Production build

Build and preview the frontend with:

```bash
cd frontend
npm run build
npm run preview
```

Run the backend with `npm start` from `backend/`. Configure production environment variables and database/service access in your hosting environment; do not place production secrets in frontend variables or source control. The backend currently permits requests from specific configured frontend origins, so update its CORS allowlist in `backend/src/main.js` when deploying to a different frontend domain.

## API overview

All API routes are mounted beneath the configured backend origin.

| Method | Path | Purpose |
| --- | --- | --- |
| `POST` | `/api/auth/signup` | Register an account |
| `POST` | `/api/auth/signin` | Sign in |
| `GET` | `/api/auth/me` | Get the current signed-in user |
| `POST` | `/api/auth/logout` | Sign out |
| `POST` | `/api/application/add` | Add an application |
| `POST` | `/api/application/get` | List applications |
| `GET` | `/api/application/id/:id` | Get an application by ID |
| `PUT` | `/api/application/update` | Update an application |
| `POST` | `/api/pdf/upload-single` | Upload a PDF resume and associated job details |
| `POST` | `/api/analysis/analyzing/:userId` | Generate an analysis |
| `GET` | `/api/analysis/getanalysis/:id` | Get an analysis by ID |
| `POST` | `/api/analysis/analysis-history` | Get analysis history |

## Development commands

Run these from the relevant package directory:

| Directory | Command | Description |
| --- | --- | --- |
| `frontend/` | `npm run dev` | Start the Vite development server |
| `frontend/` | `npm run build` | Type-check and build the frontend |
| `frontend/` | `npm run lint` | Run ESLint |
| `frontend/` | `npm run preview` | Preview the production build |
| `backend/` | `npm run dev` | Start the API with nodemon |
| `backend/` | `npm start` | Start the API with Node.js |

## Contributing

Contributions, bug reports, and suggestions are welcome. Before making a change:

1. Open an issue to discuss substantial features or behavior changes.
2. Fork the repository and create a focused branch from the default branch.
3. Make the change, keeping frontend and backend behavior and documentation in sync.
4. Run the relevant checks: `npm run lint` and `npm run build` in `frontend/`; run the backend with `npm run dev` and verify the affected API behavior.
5. Open a pull request describing the change, the reason for it, and any manual or automated checks performed.

Keep credentials and personal resume data out of commits, logs, screenshots, and pull-request examples. There is currently no backend test script defined in `backend/package.json`.

## Project layout

```text
.
├── backend/
│   └── src/
│       ├── controllers/   # Request handling and application logic
│       ├── models/        # MongoDB models
│       ├── routes/        # Express API routes
│       └── config/        # Environment, database, and service configuration
└── frontend/
    └── src/
        ├── components/    # Reusable UI components
        ├── hooks/         # API and application hooks
        ├── layouts/       # Shared page layouts
        └── pages/         # Application screens
```
