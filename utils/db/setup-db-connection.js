const mysql = require('mysql2/promise');
require('dotenv').config();

/**
 * Initializes the database connection pool.
 */
let pool;

async function setup() {

  let tempConnection;
  try {
    tempConnection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
    });

    // Create database
    const dbName = process.env.DB_NAME;
    await tempConnection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
    console.log(`Database ${dbName} created or already exists`);

  } catch (err) {
    console.error('Failed to set up database or user with root credentials:', err);
    console.log('Falling back to existing database. Ensure financial_user has privileges on financial_db.');
  } finally {
    if (tempConnection) await tempConnection.end();
  }

  /**
   * Create the shared pool for DAOs.
   */
  pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  });

  /**
   * Use the pool to create tables and insert sample data.
   */
  const connection = await pool.getConnection();
  try {
    // Create users table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        user_id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        UNIQUE (name)
      )
    `);

    // Create financial_records table with foreign key
    await connection.query(`
      CREATE TABLE IF NOT EXISTS financial_records (
        record_id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        year INT NOT NULL,
        month INT NOT NULL,
        amount DECIMAL(10, 2) NOT NULL,
        UNIQUE (user_id, year, month),
        FOREIGN KEY (user_id) REFERENCES users(user_id)
      )
    `);

    // Insert sample users if they don't exist
    const sampleUsers = [
      { user_id: 1, name: 'John Doe' },
      { user_id: 2, name: 'Jane Smith' },
    ];
    for (const user of sampleUsers) {
      await connection.query(
        'INSERT IGNORE INTO users (user_id, name) VALUES (?, ?)',
        [user.user_id, user.name]
      );
    }

    // Insert sample financial records if they don't exist
    const sampleRecords = [
      { record_id: 1, user_id: 1, year: 2025, month: 1, amount: 1500.25 },
      { record_id: 2, user_id: 1, year: 2025, month: 2, amount: 1600.50 },
      { record_id: 3, user_id: 2, year: 2025, month: 1, amount: 1200.75 },
    ];
    for (const record of sampleRecords) {
      await connection.query(
        'INSERT IGNORE INTO financial_records (record_id, user_id, year, month, amount) VALUES (?, ?, ?, ?, ?)',
        [record.record_id, record.user_id, record.year, record.month, record.amount]
      );
    }

    console.log('Database initialized successfully');
  } catch (err) {
    console.error('Database initialization error:', err);
    throw err;
  } finally {
    connection.release();
  }
}

async function close() {
  if (pool) {
    await pool.end();
  }
}

module.exports = {
  setup,
  close,
  getPool: () => pool, // Exported for DAOs to use
};