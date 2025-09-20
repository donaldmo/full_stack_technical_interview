# Financial Data Visualisation Web Application

## How to Use
1. **Access the Application**: Open your browser and go to `http://localhost:3000` after starting the server.
2. **Upload Data**: Click the file upload form, pick an Excel (.xlsx) file with `Month` and `Amount` columns, and submit it.
3. **View Dashboard**: After a successful upload, the dashboard will show the data in a table and a bar chart for the specific user and year.
4. **Retrieve Data**: Use the URL `http://localhost:3000/api/finances/userId/year` (e.g., `http://localhost:3000/api/finances/1/2025`) to fetch specific financial records in JSON format.

## Overview
This project is a full-stack web application designed to let users upload Excel files with monthly financial data and view it on a dashboard. The system uses a MySQL database, a backend API, and a frontend interface with tables and bar charts. Last updated: 09:24 PM SAST, Saturday, September 20, 2025.

## Features
- Upload Excel files (.xlsx) with financial data.
- Parse and store data in a MySQL database.
- Display data on a dashboard using tables and bar charts.
- Retrieve and visualise data for specific users and years.

## Project Structure
- **Part 1: Database (MySQL)** - Defines the schema for `users` and `financial_records` tables.
- **Part 2: Backend (Node.js/Express)** - Handles file uploads and data retrieval via API endpoints.
- **Part 3: Frontend (HTML, CSS, JavaScript)** - Provides a user interface for uploads and data visualisation.

## Installation
1. Clone the repository: `git clone <https://github.com/donaldmo/full_stack_technical_interview.git>`
2. Navigate to the project directory: `cd financial-data-visualisation`
3. Install dependencies:
   - Backend: `npm install`
4. Set up the `.env` file:
   - Create a `.env` file in the root directory.
   - Add the following environment variables:
```bash
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=financial_data
DB_PORT=3306
PORT=3000
```
