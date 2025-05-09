





# Ticket Management System

A simple ticket management system for handling anonymous support tickets. Built using Node.js, Express.js, TypeScript, PostgreSQL, and Sequelize.

## Features

* Create, update, and delete tickets.
* Manage ticket statuses (New, In Progress, Completed, Cancelled).
* Filter tickets by specific date or date range.
* Automatically cancel all tickets in the 'In Progress' status.

## Tech Stack

* **Node.js** - Backend runtime
* **Express.js** - Web framework
* **TypeScript** - Static typing
* **PostgreSQL** - Relational database
* **Sequelize** - ORM for database interactions


## Project Setup

1. Clone the repository:

```bash
git clone  https://github.com/Sevak-Badalyan/testtask.git
```

2. Install dependencies:

```bash
npm install
```
```bash
npm run build
```

3. Configure the database:

* Create a PostgreSQL database (e.g., `ticket_system`)
* Set up your `.env` file:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=ticket_system
PORT=3000
```
check also database/config/config.json file 

4. Run migrations to create the database schema:

```bash
npx sequelize-cli db:migrate or npm run migrate
```

5. Start the server:

```bash
npm run dev
```

## API Endpoints

### **Create a Ticket**

Create a new ticket with a subject and message.
**POST** `http://localhost:3000/tickets`
**Request Body:**

```json
{
  "subject": "Email Server Down",
  "message": "The email server is not responding."
}
```

**Response:**

```json
{
  "id": 1,
  "subject": "Email Server Down",
  "message": "The email server is not responding.",
  "status": "New",
  "createdAt": "2025-05-08T12:00:00Z",
  "updatedAt": "2025-05-08T12:00:00Z"
}
```

### **Get All Tickets**

Retrieve a list of all tickets.
**GET** `http://localhost:3000/tickets`

### **Update Ticket Status**

Update the status of a ticket.
**PATCH** `http://localhost:3000/tickets/:id/status`
**Request Body:**

```json
{
  "status": "Completed",
  "message": "The issue was resolved.",
  "resolution": "Restarted the email server."          // 
}
```

### **Cancel All In-Progress Tickets**

Cancel all tickets that are currently in the 'In Progress' status.
**PATCH** `http://localhost:3000/tickets/cancel-in-progress`


POST http://localhost:3000/tickets/cancel-all-in-progress
Request Body:
```json
{
  "reason": "System maintenance"
}

Response:

{
  "message": "All in-progress tickets cancelled",
  "reason": "System maintenance",
  "result": [2]  // Number of affected tickets
}
```


### **Filter Tickets by Date**

Filter tickets within a specific date range.
**GET** `http://localhost:3000/tickets?from=2025-05-01&to=2025-05-15`


