const { registerRoute } = require("../../utils/route.registry");
const { registerUser, loginController, getProfile, logoutController } = require("../controllers/users.controller");
const authenticate = require("../middleware/auth.middleware");

module.exports = (app) => {
  registerRoute(app, {
    path: '/',
    method: 'get',
    handler: (req, res) => {
      res.send('Welcome to the Financial API Server');
    },
  });

  registerRoute(app, {
    path: '/api/register',
    method: 'post',
    handler: registerUser,
  });

  registerRoute(app, {
    path: '/api/login',
    method: 'post',
    handler: loginController,
  });

  registerRoute(app, {
    path: '/api/logout',
    method: 'post',
    handler: logoutController,
  });

  registerRoute(app, {
    path: '/api/profile',
    method: 'get',
    handler: (req, res) => {
      // The authenticate middleware is called first, and if successful, it calls the getProfile handler.
      authenticate(req, res, () => getProfile(req, res));
    },
  });
};