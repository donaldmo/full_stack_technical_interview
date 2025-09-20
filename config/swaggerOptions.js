/**
 * Swagger setup
 */
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Financial Data Visualization API',
      version: '1.0.0',
      description: 'API for serving financial data visualizations',
      contact: {
        name: 'Donald Motswiri',
        email: 'domotswiri@gmail.com',
        url: 'https://github.com/donaldmo/',
      },
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}`,
      },
    ],
  },
  apis: ['./server.js'], // Ensure this points to the correct file
};

module.exports = swaggerOptions;