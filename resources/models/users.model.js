class UsersRecord {
  constructor({ user_id, name, email }) {
    this.user_id = user_id;
    this.name = name;
    this.email = email;
  }

  static fromRow(row) {
    return new UsersRecord({
      user_id: row.user_id,
      name: row.name,
      email: row.email,
    });
  }

  static toOpenApiSchema() {
    return {
      type: 'object',
      properties: {
        user_id: { type: 'integer', description: 'Unique identifier for the user' },
        name: { type: 'string', description: 'Name of the user', maxLength: 100 },
        email: { type: 'string', description: 'Email of the user', maxLength: 255 },
      },
    };
  }
}

module.exports = UsersRecord;