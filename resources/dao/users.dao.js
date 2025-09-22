const { getPool } = require('../../utils/db/setup-db-connection');
const UsersRecord = require('../models/users.model');

class UsersDAO {
  async getUserById(user_id) {
    const connection = await getPool().getConnection();
    try {
      const [rows] = await connection.query('SELECT * FROM users WHERE user_id = ?', [user_id]);
      if (rows.length === 0) {
        return null;
      }
      return UsersRecord.fromRow(rows[0]);
    } catch (err) {
      throw err;
    } finally {
      connection.release();
    }
  }

  async getUserByEmail(email) {
    const connection = await getPool().getConnection();
    try {
      const [rows] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);
      if (rows.length === 0) return null;
      return UsersRecord.fromRow(rows[0]);
    } finally {
      connection.release();
    }
  }

  async getAllUsers() {
    const connection = await getPool().getConnection();
    try {
      const [rows] = await connection.query('SELECT * FROM users');
      return rows.map(UsersRecord.fromRow);
    } catch (err) {
      throw err;
    } finally {
      connection.release();
    }
  }

  async createUser(user) {
    const connection = await getPool().getConnection();
    try {
      const [result] = await connection.query('INSERT INTO users SET ?', user);
      return { user_id: result.insertId, ...user };
    } finally {
      connection.release();
    }
  }

  async loginUser(email, password) {
    const connection = await getPool().getConnection();
    try {
      const [rows] = await connection.query(
        'SELECT * FROM users WHERE email = ? AND password = ?', [email, password]
      );

      if (rows.length === 0) {
        return null;
      }
      return UsersRecord.fromRow(rows[0]);
    } catch (err) {
      throw err;
    } finally {
      connection.release();
    }
  }
  async updateUser(user_id, user) {
  }
}

module.exports = new UsersDAO();