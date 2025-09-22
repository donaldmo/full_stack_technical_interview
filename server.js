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
const setupSwagger = require('./utils/swagger');
const routes = require('./resources/routes');
const { setup, close } = require('./utils/db/setup-db-connection');


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
setupSwagger(app);

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

routes(app);

/**
 * --- SERVER ---
 * ----------------------------------------------
 */
const PORT = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(PORT, async () => {
    await setup();

    console.log(`Server is running on PORT:${PORT}`);

    // Graceful shutdown
    process.on('SIGTERM', async () => {
      console.log('Shutting down gracefully');
      await close();
      process.exit(0);
    });
  });
}

/**
 * Exporting the app for testing purposes
 */
module.exports = app;