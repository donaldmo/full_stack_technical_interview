const registerOpenAPI = {
  summary: 'Register a new user',
  description: 'Creates a new user account.',
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            username: { type: 'string' },
            email: { type: 'string', format: 'email' },
            password: { type: 'string', format: 'password' },
          },
          required: ['username', 'email', 'password'],
        },
      },
    },
  },
  responses: {
    201: {
      description: 'User registered successfully.',
    },
    400: {
      description: 'User already exists.',
    },
    500: {
      description: 'Internal server error.',
    },
  },
};

const loginOpenAPI = {
  summary: 'Login a user',
  description: 'Authenticates a user and returns a JWT.',
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            email: { type: 'string', format: 'email' },
            password: { type: 'string', format: 'password' },
          },
          required: ['email', 'password'],
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Login successful.',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: { type: 'string' },
              accessToken: { type: 'string' },
            },
          },
        },
      },
    },
    401: {
      description: 'Invalid email or password.',
    },
    500: {
      description: 'Server error.',
    },
  },
};

const profileOpenAPI = {
  summary: "Get user's profile",
  description: 'Returns the profile of the authenticated user.',
  security: [{ bearerAuth: [] }],
  responses: {
    200: {
      description: "User's profile.",
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              user_id: { type: 'integer' },
              email: { type: 'string' },
              name: { type: 'string' },
            },
          },
        },
      },
    },
    401: {
      description: 'Unauthorized.',
    },
    403: {
      description: 'Forbidden: Invalid token.',
    },
    404: {
      description: 'User not found.',
    },
    500: {
      description: 'Internal Server Error.',
    },
  },
};

const logoutOpenAPI = {
  summary: 'Logout a user',
  description: 'Logs out the authenticated user by invalidating the JWT.',
  security: [{ bearerAuth: [] }],
  responses: {
    200: {
      description: 'Logout successful.',
    },
    401: {
      description: 'Unauthorized.',
    },
    403: {
      description: 'Forbidden: Invalid token.',
    },
    500: {
      description: 'Internal Server Error.',
    },
  },
}

module.exports = {
  registerOpenAPI,
  loginOpenAPI,
  logoutOpenAPI,
  profileOpenAPI,
};