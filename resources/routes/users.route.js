const { usersController } = require('../controllers/users.controller');
const usersOpenapi = require('../openapi/users.openapi');
const { registerRoute } = require('../../utils/route.registry');
const authenticate = require('../middleware/auth.middleware');

module.exports = (app) => {
  registerRoute(app, {
    path: '/api/users',
    method: 'get',
    handler: usersController,
    middleware: [authenticate],
    openapi: usersOpenapi,
  });
};