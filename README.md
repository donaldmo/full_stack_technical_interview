# Financial Data API

## Overview
This project is a backend API for managing financial records, built with Node.js, Express.js, and MariaDB (a MySQL-compatible database). It provides an endpoint to retrieve financial records for a specific user, with Swagger documentation for API exploration. The application uses a Data Provider Object (DPO) pattern for database interactions and supports a modular structure with routes, controllers, and models. Future enhancements will include Excel file uploads and a frontend dashboard for data visualization. Last updated: 12:26 PM SAST, Monday, September 22, 2025.

## Features
- Retrieve financial records for a specific user via `GET /api/financial-records?user_id=`.
- MariaDB database with `users` (`user_id`, `name`) and `financial_records` (`record_id`, `user_id`, `year`, `month`, `amount`) tables.
- Swagger UI for API documentation at `http://localhost:3000/api-docs`.
- Environment variable configuration using `dotenv`.
- Programmatic database creation (`financial_db`) on server startup.
- Planned: Excel file upload for importing financial data.
- Planned: Frontend dashboard with tables and bar charts for data visualization.

## Installation
1. Clone the repository:
   ```bash
   git clone <https://github.com/donaldmo/full_stack_technical_interview.git>
   ```
2. Navigate to the project directory:
   ```bash
   cd full_stack_technical_interview
   ```
3. Install dependencies:
   ```bash
   npm install express mysql2 swagger-ui-express dotenv
   ```
4. Create a `.env` file in the project root and add the following:
   ```bash
   DB_HOST=localhost
   DB_USER=financial_user
   DB_PASSWORD=your_password
   DB_NAME=financial_db
   DB_PORT=3306
   PORT=3000
   ```
   - Replace `your_password` with a secure password for the MariaDB user.
   - Add `.env` to `.gitignore` to prevent committing sensitive data.

## MariaDB Database Setup
The application uses a MariaDB database (MySQL-compatible) with two tables: `users` and `financial_records`. The database (`financial_db`) is created automatically on server startup if it doesn’t exist, provided the user has sufficient privileges.

### 1. Install MariaDB
- **Linux (Ubuntu/Debian or Kali)**:
  ```bash
  sudo apt update
  sudo apt install mariadb-server
  sudo systemctl start mariadb
  sudo systemctl enable mariadb
  ```
- **macOS (Homebrew)**:
  ```bash
  brew install mariadb
  brew services start mariadb
  ```
- **Windows**:
  - Download and install from [MariaDB Downloads](https://mariadb.org/download/).
  - Add `C:\Program Files\MariaDB\bin` to your system PATH.
  - Start the service via the Services panel or:
    ```cmd
    net start mariadb
    ```

### 2. Secure MariaDB Installation
Run the secure installation script:
```bash
sudo mysql_secure_installation
```
- Enter the current root password (default is empty; press Enter).
- Set a root password (e.g., `root_password`).
- Answer `Y` to remove anonymous users, disallow remote root login, remove test database, and reload privileges.

### 3. Create the MariaDB User
Log in to MariaDB as the `root` user:
```bash
sudo mariadb -u root -p
```
Run:
```sql
CREATE USER 'financial_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT CREATE ON *.* TO 'financial_user'@'localhost';
GRANT ALL PRIVILEGES ON financial_db.* TO 'financial_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### 4. Verify Database Setup
Test the connection:
```bash
mariadb -u financial_user -p -h localhost
```
Enter `your_password`. Then:
```sql
CREATE DATABASE test_db;
DROP DATABASE test_db;
```
If successful, the user has sufficient privileges to create databases.

### 5. Configure MariaDB (if needed)
If you encounter connection errors, check the MariaDB configuration:
- Edit `my.cnf` (e.g., `/etc/mysql/my.cnf` or `/etc/mysql/mariadb.conf.d/50-server.cnf` on Linux):
  ```ini
  [mysqld]
  bind-address = 127.0.0.1
  ```
- Restart MariaDB:
  ```bash
  sudo systemctl restart mariadb
  ```

## Running the Application
1. Start the MariaDB service (if not already running):
   ```bash
   sudo systemctl start mariadb
   ```
   or (macOS):
   ```bash
   brew services start mariadb
   ```
2. Run the application:
   ```bash
   node app.js
   ```
   Expected output:
   ```
   Database financial_db created or already exists
   Database initialized successfully
   Server running on port 3000
   ```
3. Access the API:
   - Swagger UI: `http://localhost:3000/api-docs`
   - Retrieve financial records: `GET http://localhost:3000/api/financial-records?user_id=1`
     Expected response:
     ```json
     [
       { "record_id": 1, "user_id": 1, "year": 2025, "month": 1, "amount": 1500.25 },
       { "record_id": 2, "user_id": 1, "year": 2025, "month": 2, "amount": 1600.50 }
     ]
     ```

## Database Schema
The application uses two MariaDB tables:
- **users**:
  - `user_id`: INT AUTO_INCREMENT PRIMARY KEY
  - `name`: VARCHAR(100) NOT NULL, UNIQUE
- **financial_records**:
  - `record_id`: INT AUTO_INCREMENT PRIMARY KEY
  - `user_id`: INT NOT NULL, FOREIGN KEY REFERENCES users(user_id)
  - `year`: INT NOT NULL
  - `month`: INT NOT NULL
  - `amount`: DECIMAL(10, 2) NOT NULL
  - UNIQUE (user_id, year, month)

Sample data is inserted automatically on server startup if it doesn’t exist, using `INSERT IGNORE` to prevent duplicates based on unique constraints.

## Project Structure
```
project/
├── resources/
│   ├── controllers/
│   │   └── financial-data.controller.js
│   ├── models/
│   │   └── financial-data.model.js
│   ├── dpo/
│   │   └── financial-data.dpo.js
│   ├── routes/
│   │   ├── index.js
│   │   └── financial-data.route.js
├── app.js
├── routeRegistry.js
├── swagger.js
├── .env
└── package.json
```

## Planned Features
- **Excel Upload**: Allow users to upload `.xlsx` files with financial data (columns: `Month`, `Amount`).
- **Frontend Dashboard**: Display financial records in a table and bar chart for a specific user and year.
- **API Enhancements**: Add endpoints for creating/updating users and records.

## Troubleshooting
- **Connection Errors**:
  - Check `.env` file for correct `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_NAME`, `DB_PORT`.
  - Ensure MariaDB is running: `sudo systemctl status mariadb`.
- **Duplicate Data**:
  - The `setup` method uses `INSERT IGNORE` with `UNIQUE` constraints to prevent duplicate users (`name`) and records (`user_id`, `year`, `month`).
- **Permission Errors**:
  - Re-run:
    ```sql
    GRANT CREATE ON *.* TO 'financial_user'@'localhost';
    GRANT ALL PRIVILEGES ON financial_db.* TO 'financial_user'@'localhost';
    FLUSH PRIVILEGES;
    ```
  - Verify user privileges: `SELECT * FROM mysql.user WHERE user = 'financial_user';`.