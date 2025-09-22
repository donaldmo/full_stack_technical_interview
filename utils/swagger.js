const { getSwaggerSpec } = require('./route.registry');
const swaggerUi = require('swagger-ui-express');

module.exports = (app) => {
  const swaggerDoc = getSwaggerSpec();
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
};