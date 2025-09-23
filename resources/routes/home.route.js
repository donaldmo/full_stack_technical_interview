const { registerRoute } = require("../../utils/route.registry");
const { homeOpenAPI } = require('../openapi/home.openapi');

module.exports = (app) => {
  registerRoute(app, {
    path: '/api/',
    method: 'get',
    handler: (req, res) => {
      res.send('Welcome to financial system API!');
    },
    openapi: homeOpenAPI,
  })
}