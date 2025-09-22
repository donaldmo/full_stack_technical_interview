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
const session = require('express-session');
const cookieParser = require('cookie-parser');

const setupSwagger = require('./utils/swagger');
const routes = require('./resources/routes');
const { setup, close } = require('./utils/db/setup-db-connection');
const authenticate = require('./resources/middleware/auth.middleware');

const { loginController, logoutController } = require('./resources/controllers/users.controller');


require('dotenv').config();
const app = express();


/**
 * --- MIDDLEWARE SETUP ---
 * ----------------------------------------------
 */
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

/**
 * --- SESSION ---
 * ----------------------------------------------
 */
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.NODE_ENV === 'production' }
}));

/**
 * --- API DOCUMENTATION ---
 * ----------------------------------------------
 */
setupSwagger(app);
/**
 * TODO: JSDOC
 */

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

// Routes
app.post('/login', loginController);
app.post('/logout', logoutController);

/** Protected Route */
app.get('/profile', authenticate)

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