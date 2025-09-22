const usersRoutes = require('./users.route');

module.exports = (app) => {
  usersRoutes(app);
};