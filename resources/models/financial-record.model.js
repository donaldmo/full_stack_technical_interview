class FinancialRecord {
  constructor({ record_id, user_id, year, month, amount }) {
    this.record_id = record_id;
    this.user_id = user_id;
    this.year = year;
    this.month = month; 
    this.amount = amount; 
  }


  static fromRow(row) {
    return new FinancialRecord({
      record_id: row.record_id,
      user_id: row.user_id,
      year: row.year,
      month: row.month,
      amount: parseFloat(row.amount),
    });
  }

  static toOpenApiSchema() {
    return {
      type: 'object',
      properties: {
        record_id: { type: 'integer', description: 'Unique record ID' },
        user_id: { type: 'integer', description: 'ID of the user' },
        year: { type: 'integer', description: 'Year of the financial record' },
        month: { type: 'integer', description: 'Month of the financial record' },
        amount: { type: 'number', format: 'decimal', description: 'Financial amount' },
      },
      required: ['user_id', 'year', 'month', 'amount'],
    };
  }
}

module.exports = FinancialRecord;
