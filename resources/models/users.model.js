class UsersRecord {
  constructor({ user_id, name }) {
    this.user_id = user_id;
    this.name = name;
  }

  static fromRow(row) {
    return new UsersRecord({
      user_id: row.user_id,
      name: row.name,
    });
  }

  static toOpenApiSchema() {
    return {
      type: 'object',
      properties: {
        user_id: { type: 'integer', description: 'Unique identifier for the user' },
        name: { type: 'string', description: 'Name of the user', maxLength: 100 },
      },
    };
  }
}

module.exports = UsersRecord;