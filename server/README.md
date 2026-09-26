# Backend README

This is the Express backend for the TODO app. It exposes a small REST API and stores TODOs in MongoDB.

## Setup

```bash
cd server
npm install
cp .env.example .env
npm run dev
```

By default, the server runs on:

```text
http://localhost:5000
```

## Environment Variables

Create a `.env` file in this folder.

On Windows PowerShell, this command also works:

```powershell
Copy-Item .env.example .env
```

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/fullstack-todo
CLIENT_URL=http://localhost:5173
DNS_SERVERS=8.8.8.8,1.1.1.1
```

For MongoDB Atlas, replace `MONGODB_URI` with your Atlas connection string.

## API Routes

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/todos` | Get all TODO items |
| POST | `/api/todos` | Create a new TODO item |
| PUT | `/api/todos/:id` | Update the title and description |
| PATCH | `/api/todos/:id/done` | Toggle the done status |
| DELETE | `/api/todos/:id` | Delete a TODO |

## TODO Model

```json
{
  "_id": "string",
  "title": "string",
  "description": "string",
  "done": "boolean",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

## Assumptions and Limits

- The title is required.
- The description is optional.
- There is no authentication.
- All TODOs are part of one shared list.
- MongoDB needs to be running locally, or a MongoDB Atlas connection string needs to be used.
