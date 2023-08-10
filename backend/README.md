# DEEL Backend Task

A Node.js/Express.js application that serves a REST API for managing profiles,s and jobs.

[🚀 Live Backend]()

## Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Security](#security)
- [Dependencies](#dependencies)
- [Development Dependencies](#development-dependencies)

## Requirements

- Node.js >= 10.16.3

## Installation

1. Clone the repository.
2. Navigate to the project root directory.
3. Run the following command to install all required dependencies:

   ```
   npm install
   ```

4. Seed the local SQLite database with the following command:

   ```
   npm run seed
   ```

## Running the Application

Start the server with the following command:

```
npm run dev
```

`npm start` is used for deployment, for development it's better to run with the dev command.

The server will be running on [http://localhost:3001](http://localhost:3001).

## API Endpoints

### Authentication

Users are authenticated by passing `profile_id` in the request header. After a user is authenticated his profile will be available under `req.profile`.

All the protected routes can be accessed if the correct `profile_id` is set in the request headers.

### Profiles

- **GET** `/profiles?type=client|contractor`: Fetch profiles based on type (client|contractor)
- **GET** `/login`: To log in as a client user.

### Jobs

- **GET** `/jobs/unpaid`: Fetch all unpaid jobs for the authenticated profile. (protected)
- **GET** `/jobs`: Fetch all jobs for the contractor profile. (protected)
- **POST** `/jobs/:id/pay`: Pay for a specific job by ID. (protected)

### Balances

- **POST** `/balances/deposit/:userId`: Deposit money into a client's balance. Should include the amount in `req.body.amount`

### Admin

- **GET** `/admin/best-profession?start=<Date>&&end=<Date>`: Return the best profession within a specified date range.
- **GET** `/admin/best-clients?start=<Date>&&end=<Date>`: Return the best clients within a specified date range.

  Additionally you can use `limit` query to limit the results (by default limit is set to 2).

## Security

- **Rate Limiting**: Applied rate limiting in the endpoint levels to prevent abuse of the API.
- **Validation**: Ensures that only valid data is processed.
- **Secure Headers**: Implemented using Helmet to set various HTTP headers.

## Dependencies

- `body-parser`: Parse incoming request bodies.
- `cors`: Enable CORS with various options.
- `express-rate-limit`: Basic rate-limiting middleware for Express.
- `express-validator`: Express middleware for validating requests.
- `helmet`: Secure Express apps by setting various HTTP headers.
- `sequelize`: Promise-based Node.js ORM for SQL databases.
- `sqlite3`: SQLite client for Node.js.

## Development Dependencies

- `nodemon`: Automatically restart the application when file changes are detected.
- `supertest`: HTTP assertions library for testing.
