# Financial Records API

This project is a **Node.js + MariaDB** backend for managing users and their financial records.

---

## Clone the repo:

## 📦 Prerequisites

Make sure you have the following installed:

* [Node.js](https://nodejs.org/) (v18+ recommended)
* [MariaDB](https://mariadb.org/download/)
* npm or yarn

---

## ⚙️ Setup MariaDB

1. **Start MariaDB service:**

   ```bash
   sudo systemctl start mariadb
   ```

2. **Login into MariaDB:**

   ```bash
   mariadb -u root -p
   ```

3. **Create database and user:**

   ```sql
   CREATE DATABASE financial_db;
   CREATE USER 'financial_user'@'localhost' IDENTIFIED BY 'your_password';
   GRANT ALL PRIVILEGES ON financial_db.* TO 'financial_user'@'localhost';
   FLUSH PRIVILEGES;
   ```

4. **Create tables:**

   ```sql
   USE financial_db;

   CREATE TABLE IF NOT EXISTS users (
       user_id INT AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(100) NOT NULL,
       email VARCHAR(255) NOT NULL UNIQUE,
       password VARCHAR(255) NOT NULL
   );

   CREATE TABLE IF NOT EXISTS financial_records (
       record_id INT AUTO_INCREMENT PRIMARY KEY,
       user_id INT NOT NULL,
       year INT NOT NULL,
       month INT NOT NULL,
       amount DECIMAL(10, 2) NOT NULL,
       UNIQUE (user_id, year, month),
       FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
   );
   ```

---

## 📁 Project Setup

1. **Clone the repo**

   ```bash
   git clone git@github.com:donaldmo/full_stack_technical_interview.git
   cd full_stack_technical_interview
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment**
   Create a `.env` file in the root of the project:

   ```env
   # Database configuration
   DB_HOST=localhost
   DB_USER=financial_user
   DB_PASSWORD=your_password
   DB_NAME=financial_db
   DB_PORT=3306

   # App port
   PORT=3000
   ```

---

## 🚀 Run the Project

### Development

```bash
npm run dev
```

## 🛠️ Common Commands

* Restart MariaDB:

  ```bash
  sudo systemctl restart mariadb
  ```
* Check status:

  ```bash
  systemctl status mariadb
  ```
* Login as project user:

  ```bash
  mariadb -u financial_user -p -h localhost financial_db
  ```

---
## 🔗 API Endpoints

### Users

* `POST /api/users/register` - Register a new user
* `POST /api/users/login` - Login a user

### Financial Records

* `POST /api/finances/upload/:userId/:year` - Upload financial records for a user
* `GET /api/finances/:userId/:year` - Get financial records for a user

---

## Front End Pages

* `http://localhost:3000/` - Financial Records Page with Data Visualisation
* `http://localhost:3000/login.html` - Login Page
* `http://localhost:3000/register.html` - Register Page
---

### API Documentation with Swagger

* Swagger UI: `http://localhost:3000/api-docs`

---