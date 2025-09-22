const { registerRoute } = require("../../utils/route.registry");
const { usersController } = require("../controllers/users.controller");
const usersOpenapi = require("../openapi/users.openapi");


module.exports = (app) => {
  registerRoute(app, {
    path: '/api/users',
    method: 'get',
    handler: usersController,
    openapi: usersOpenapi,
  });
};