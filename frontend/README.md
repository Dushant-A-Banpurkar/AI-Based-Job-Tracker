# Frontend

This is the React and TypeScript client for AI-Based Job Tracker. For full project installation, backend configuration, usage, API, and contribution instructions, see the [project README](../README.md).

## Local development

From this directory, install dependencies and start the Vite server:

```bash
npm install
npm run dev
```

The frontend is served at `http://localhost:4000`. Configure `VITE_BACKEND_API` in `frontend/.env` to point to the primary backend origin (for example, `http://localhost:5000`). Optionally set `VITE_BACKEND_BACKUP_API` to a second deployed backend origin. The backup must expose `/ready` and use the same database and authentication configuration. Set both variables in your frontend hosting provider and redeploy for production changes to take effect.

## Available scripts

- `npm run dev` — start the development server
- `npm run build` — type-check and create a production build
- `npm run lint` — run ESLint
- `npm run preview` — preview the production build locally
