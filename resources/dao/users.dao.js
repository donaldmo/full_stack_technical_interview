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
}

module.exports = new UsersDAO();