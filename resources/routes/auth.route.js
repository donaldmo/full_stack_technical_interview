const { registerRoute } = require("../../utils/route.registry");
const { registerUser, loginController, getProfile, logoutController } = require("../controllers/users.controller");
const authenticate = require("../middleware/auth.middleware");
const { registerOpenAPI, loginOpenAPI, profileOpenAPI, logoutOpenAPI } = require('../openapi/auth.openapi');

module.exports = (app) => {
  registerRoute(app, {
    path: '/api/auth/register',
    method: 'post',
    handler: registerUser,
    openapi: registerOpenAPI,
  });

  registerRoute(app, {
    path: '/api/auth/login',
    method: 'post',
    handler: loginController,
    openapi: loginOpenAPI,
  });

  registerRoute(app, {
    path: '/api/auth/logout',
    method: 'post',
    handler: logoutController,
    openapi: logoutOpenAPI,
  });

  registerRoute(app, {
    path: '/api/auth/profile',
    method: 'get',
    middleware: [authenticate],
    handler: getProfile,
    openapi: profileOpenAPI,
  });
};