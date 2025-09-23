const { getPool } = require('../../utils/db/setup-db-connection');
const FinancialRecord = require('../models/financial-record.model');

class FinancialRecordDAO {
  async createFinancialRecord(financialRecord) {
    const connection = await getPool().getConnection();
    try {
      const [result] = await connection.query(
        'INSERT INTO financial_records SET ?',
        financialRecord
      );
      return { record_id: result.insertId, ...financialRecord };
    } finally {
      connection.release();
    }
  }

  async getFinancialRecords() {
    const connection = await getPool().getConnection();
    try {
      const [rows] = await connection.query('SELECT * FROM financial_records');
      return rows.map(FinancialRecord.fromRow);
    } finally {
      connection.release();
    }
  }

  async getRecordsByUserAndYear(userId, year) {
    const connection = await getPool().getConnection();
    try {
      const [rows] = await connection.query(
        'SELECT * FROM financial_records WHERE user_id = ? AND year = ?',
        [userId, year]
      );
      return rows.map(FinancialRecord.fromRow);
    } finally {
      connection.release();
    }
  }

  async bulkInsert(records) {
    if (!records.length) return [];
    const connection = await getPool().getConnection();
    try {
      const placeholders = records.map(() => '(?, ?, ?, ?)').join(',');
      const values = [];
      for (const r of records) {
        values.push(r.user_id, r.year, r.month, r.amount);
      }
      const sql = `
        INSERT IGNORE INTO financial_records (user_id, year, month, amount)
        VALUES ${placeholders}
      `;
      const [result] = await connection.query(sql, values);
      return result.affectedRows;
    } finally {
      connection.release();
    }
  }
}

module.exports = new FinancialRecordDAO();
