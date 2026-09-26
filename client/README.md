# Frontend README

This is the React frontend for the TODO app. It talks to the Express backend over HTTP.

## Setup

```bash
cd client
npm install
cp .env.example .env
npm run dev
```

The app usually opens at:

```text
http://localhost:5173
```

## Environment Variables

Create a `.env` file in this folder.

On Windows PowerShell, this command also works:

```powershell
Copy-Item .env.example .env
```

```env
VITE_API_URL=http://localhost:5000/api
```

## Features

- View all TODOs
- Add a TODO
- Edit the title and description
- Mark a TODO as done or not done
- Delete a TODO
- Shows loading, empty, success, and error states

## Assumptions and Limits

- The backend is running on port `5000`.
- TODO titles are required.
- There is no login screen.
- All TODOs are shown in one shared list.
