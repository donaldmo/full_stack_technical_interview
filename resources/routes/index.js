const homeRoutes = require('./home.route')
const usersRoutes = require('./users.route');
const authRoutes = require('./auth.route');

module.exports = (app) => {
  homeRoutes(app);
  usersRoutes(app);
  authRoutes(app);
};