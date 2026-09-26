# Full Stack TODO App

A TODO app for the full-stack JavaScript take-home assignment.

The app has a React frontend, an Express backend, and MongoDB for storing TODO items.

## Folder Structure

```text
hiring-fullstack-todo/
├── client/     # React frontend
├── server/     # Express backend
└── README.md
```

## What It Does

- Shows all TODOs
- Adds a TODO with a title and optional description
- Edits a TODO
- Marks a TODO as done or not done
- Deletes a TODO
- Handles loading and error states
- Uses form validation and simple user-friendly messages

## Quick Start

Run the backend first:

```bash
cd server
npm install
cp .env.example .env
npm run dev
```

Then run the frontend in another terminal:

```bash
cd client
npm install
cp .env.example .env
npm run dev
```

On Windows PowerShell, use this instead of `cp`:

```powershell
Copy-Item .env.example .env
```

Frontend: `http://localhost:5173`

Backend: `http://localhost:5000`

## More Details

Each folder has its own README with setup notes:

- `client/README.md`
- `server/README.md`
