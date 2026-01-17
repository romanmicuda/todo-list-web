# Todo List Application

A full-stack Todo List application built with a modern technology stack, featuring strict data validation and a responsive user interface.

## About The Project

This project demonstrates a robust implementation of a standard CRUD application using robust tools for both backend and frontend development.

### Built With

*   **Backend**: [NestJS](https://nestjs.com/) - A progressive Node.js framework for building efficient, scalable server-side applications.
*   **Frontend**: [React](https://reactjs.org/) with [TanStack Query](https://tanstack.com/query/latest) for efficient server state management.
*   **UI Framework**: [Ant Design](https://ant.design/) - An enterprise-class UI design language and React UI library.
*   **Validation**: [Zod](https://zod.dev/) - TypeScript-first schema declaration and validation library, used on both client (API response/request validation) and server (DTO validation).
*   **Database**: [PostgreSQL](https://www.postgresql.org/) with [TypeORM](https://typeorm.io/).
*   **Tooling**: [Vite](https://vitejs.dev/) for fast frontend build and development.

## Features

-   **Create Todos**: Add new tasks with titles and optional descriptions.
-   **List View**: View all todos in a structured table.
-   **Status Management**: Toggle todo status between "Pending" and "Done" with a single click.
-   **Delete**: Remove completed or unwanted todos.
-   **Validation**: Robust input validation ensures data integrity using Zod schemas.
-   **Real-time Feedback**: Instant UI updates and success/error notifications.

## Prerequisites

Before running the project, ensure you have the following installed:

*   [Node.js](https://nodejs.org/) (v16 or higher recommended)
*   [PostgreSQL](https://www.postgresql.org/)

## Installation & Running

### 1. Database Setup

Ensure you have a PostgreSQL database running. The default configuration in `api/src/app.module.ts` expects:

-   **Host**: `localhost`
-   **Port**: `5432`
-   **Username**: `postgres`
-   **Password**: `postgres`
-   **Database**: `todolist`

Create a database named `todolist` if it doesn't exist.

### 2. Backend (API)

Navigate to the `api` directory to set up the server:

```bash
cd api
npm install
```

Start the development server:

```bash
npm run start:dev
```

The API will be available at `http://localhost:3001` (CORS enabled for port 3000).

### 3. Frontend (Web)

Open a new terminal and navigate to the `web` directory:

```bash
cd web
npm install
```

Start the development server:

```bash
npm run dev
```

The application will be running at `http://localhost:3000`.

## Project Structure

-   `/api` - NestJS backend application.
    -   `src/todo` - Todo module containing Controller, Service, Entity, and DTOs.
    -   `src/common` - Shared utilities like pipes.
-   `/web` - React Frontend application.
    -   `src/routes` - Application routes (TanStack Router).
    -   `src/lib/api.ts` - Axios client and Zod schemas.
