# DEEL Frontend Task - Simple Demo Application

This frontend application is a very basic React app designed to demonstrate the usage of our backend API. It provides a simple interface to interact with the various endpoints, covering contracts, jobs, balance management, and admin functionalities.

[🚀 Live Demo] (https://contracts-board-app.web.app/)

## Overview

The application is intentionally minimal, focusing on functionality rather than styling or advanced features. The primary goal is to showcase the integration with the backend API, allowing users to:

- Select and login by client profile
- View and pay unpaid jobs for active contracts
- Deposit money into a client's balance

## Setup and Running

To get started with the application, follow these steps:

1. **Install Dependencies**: Run `npm install` to install all required dependencies.
2. **Start the Application**: Run `npm start` to start the development server.
3. **Environment Variables**: There's a `REACT_APP_API_URL` in `.env` file, make sure it refers to where you have the backend running.
4. **Access the Application**: Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

## Architecture and Components

The application is built using React and consists of the following main components:

- `Login`: Displays non-terminated contracts for the authenticated profile.
- `JobsPage`: Lists unpaid jobs for active contracts and allows payment.
- `MainPage`: Enables depositing money into a client's balance. Search contractor profiles

## Authorization

The application includes the `profile_id` in the headers of each API request to authorize the user. Make sure that the corresponding `profile_id` is available and correctly configured.

## Limitations and Simplifications

- **Styling**: The application uses very basic JSS styling without focusing on aesthetics.
- **Error Handling**: The error handling is minimal, mainly focusing on demonstrating API interactions.
- **Authentication**: The authentication process is simplified, relying on the `profile_id` provided in the headers.
