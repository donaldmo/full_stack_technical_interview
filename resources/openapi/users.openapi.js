const usersOpenapi = {
  summary: 'Get Users',
  description: 'Retrieve a list of users',
  responses: {
    200: {
      description: 'A list of users',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                name: { type: 'string' },
              },
            },
          },
        },
      },
    },
    400: { description: 'Bad Request' },
    500: { description: 'Internal Server error' },
  },
}

module.exports = usersOpenapi;