const express = require('express');
const routeMetadata = [];


function registerRoute(app, { path, method, handler, middleware = [], openapi = {} }) {
  app[method](path, ...middleware, handler);
  routeMetadata.push({ path, method, ...openapi });
}

function getSwaggerSpec() {
  const swaggerDoc = {
    openapi: '3.0.0',
    info: { title: 'Financial Data API', version: '1.0.0' },
    paths: {},
  };
  routeMetadata.forEach((route) => {
    swaggerDoc.paths[route.path] = {
      [route.method]: {
        summary: route.summary,
        description: route.description,
        operationId: route.operationId,
        parameters: route.parameters,
        responses: route.responses,
      },
    };
  });
  return swaggerDoc;
}

module.exports = { registerRoute, getSwaggerSpec };