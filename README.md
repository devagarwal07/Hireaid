# Hireaid

Hireaid is a full-stack applicant tracking and hiring management system.

## Project Structure

- `/src` - Frontend React application (Vite + TypeScript)
- `/server` - Backend Node.js API (Express + Prisma + SQLite)

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm

### 1. Frontend Setup

From the root directory:
```bash
npm install
npm run dev
```
The frontend will run on `http://localhost:5173`.

### 2. Backend Setup

Open a new terminal and navigate to the `server` directory:

```bash
cd server
npm install
```

Initialize the database and seed it with initial data:

```bash
npx prisma db push
npm run db:seed
```

Start the backend development server:

```bash
npm run dev
```

The backend API will start on `http://localhost:5001`.

## Features
- **Authentication**: JWT-based login and registration.
- **Jobs Management**: Create, update, duplicate, and manage job postings.
- **Candidate Pipeline**: Track candidates throughout the hiring process, add notes, and upload resumes.
- **Interviews**: Schedule interviews, view upcoming schedules, and submit evaluation reports.
- **Company Management**: Manage employer client details.

## Tech Stack
**Frontend**: React, TypeScript, Tailwind CSS, Vite
**Backend**: Node.js, Express, Prisma ORM, SQLite, Zod (Validation), Multer (Uploads)
