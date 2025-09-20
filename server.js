/**
 * Author: Donald Motswiri
 * GitHub: https://github.com/donaldmo/
 * Email: domotswiri@gmail.com
 * Technical Interview - Financial Data Visualisation Web Application.
 */

/**
 * Importing necessary modules
 */
const express = require('express');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = require('./config/swaggerOptions');


require('dotenv').config();
const app = express();


/**
 * --- MIDDLEWARE ---
 * ----------------------------------------------
 */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

/**
 * --- API DOCUMENTATION ---
 * ----------------------------------------------
 */
/**
 * Swagger setup
 */

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


/**
 * --- ROUTES ---
 * ----------------------------------------------
 */

/**
 * GET /
 * @openapi
 * /:
 *   get:
 *     summary: Welcome endpoint for the Financial API Server
 *     description: Returns a welcome message indicating the server is running.
 *     operationId: getWelcome
 *     responses:
 *       200:
 *         description: Welcome message
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Welcome to the Financial API Server
 */
app.get('/', (req, res) => {
  res.send('Welcome to the Financial API Server');
});


/**
 * --- SERVER ---
 * ----------------------------------------------
 */

/**
 * Start the server on port 3000 
 * or the port specified in environment variables.
 */
const PORT = process.env.PORT || 3000;


if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on PORT:${PORT}`);
  });
}

/**
 * Exporting the app for testing purposes
 */
module.exports = app;