const usersRoutes = require('./users.route');
const authRoutes = require('./auth.route');

module.exports = (app) => {
  usersRoutes(app);
  authRoutes(app);
};