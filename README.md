
# Email Scheduler App
<img width="1440" alt="Screenshot 2024-02-01 at 2 14 48 AM" src="https://github.com/vermaAtul1520/email-scheduler/assets/87474368/3767c6b7-2509-48fc-9f99-0586fa025533">


A full-stack email scheduler application built with Next.js, TypeScript, and MongoDB.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)

## Features

- Schedule new emails with details such as title, description, time, etc.
- View a list of scheduled emails.
- Edit and update existing scheduled emails.
- Delete scheduled emails.
- Search functionality based on email title.

## Getting Started

### Prerequisites

- Node.js: [Install Node.js](https://nodejs.org/)
- MongoDB: [Install MongoDB](https://docs.mongodb.com/manual/installation/)

### Installation


1. Clone the repository:

```bash
git clone https://github.com/vermaAtul1520/email-scheduler.git
cd email-scheduler
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

   Create a `.env.local` file in the root of your project and add the following variables:

   ```env
   MONGO_URL=your_mongodb_connection_string
   NEXT_PUBLIC_BASE_URI=backend_base_url
   ```

   Replace `your_mongodb_connection_string` with your MongoDB connection string and `backend_base_url` with your actual base url of backend.

## Usage

1. Start the Next.js development server:

```bash
npm run dev
```

2. Open your browser and go to [http://localhost:3000](http://localhost:3000)

3. Explore the email scheduler application.

## API Endpoints
The backend of the application exposes the following API endpoints:

- `GET /api/schedules`: Returns a list of all schedules.
- `GET /api/schedules?title=sampletitle`: Returns a filtered list based on the title.
- `GET /api/schedules/:id`: Returns specific schedule details.
- `PATCH /api/schedules/:id`: Updates a specific schedule.
- `DELETE /api/schedules/:id`: Deletes a specific schedule.
- `POST /api/schedules`: Creates a new schedule.

## Project Structure

```
/
|-- pages/            # Next.js pages
|-- components/       # React components
|-- lib/              # Utility functions and constants
|-- controllers/      # API route controllers
|-- middlewares/      # Middleware functions
|-- public/           # Public assets
|-- styles/           # CSS styles
|-- .env.local        # Environment variables
|-- next.config.js    # Next.js configuration
|-- package.json      # Node.js dependencies
|-- README.md         # Project documentation
```

## Tech Stack

- Next.js
- TypeScript
- MongoDB
- CSS (Vanilla)
