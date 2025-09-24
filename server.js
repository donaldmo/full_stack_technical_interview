/**
 * @file server.js
 * @description This file contains the main server setup for the Financial Data Visualization API.
 * @author Donald Motswiri
 * @github https://github.com/donaldmo/
 * @email domotswiri@gmail.com
 * @email rmotswiri023@student.wethinkcode.co.za
 */

/**
 * Importing necessary modules
 * @namespace {object} express - Express.js framework
 * @namespace {object} cors - CORS middleware
 * @namespace {object} session - Express session middleware
 * @namespace {object} cookieParser - Cookie parser middleware
 * @namespace {object} setupSwagger - Swagger setup utility
 * @namespace {object} routes - Application routes
 * @namespace {object} db - Database setup and connection utility
 */
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const setupSwagger = require('./utils/swagger');
const routes = require('./resources/routes');
const { setup, close } = require('./utils/db/setup-db-connection');

require('dotenv').config();
const app = express();


/**
 * --- MIDDLEWARE SETUP ---
 * @description Configures middleware for the Express application.
 * @property {function} express.json - Parses incoming JSON requests.
 * @property {function} cookieParser - Parses cookies attached to the client request object.
 * @property {function} express.urlencoded - Parses incoming requests with URL-encoded payloads.
 * @property {function} cors - Enables Cross-Origin Resource Sharing.
 * @property {function} express.static - Serves static files from the 'public' directory.
 * ----------------------------------------------
 */
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static('public'));

/**
 * --- SESSION ---
 * @description Configures session management for the application.
 * @property {string} secret - The secret used to sign the session ID cookie.
 * @property {boolean} resave - Forces the session to be saved back to the session store.
 * @property {boolean} saveUninitialized - Forces a session that is "uninitialized" to be saved to the store.
 * @property {object} cookie - Settings for the session cookie.
 * @property {boolean} cookie.secure - Ensures cookies are only sent over HTTPS.
 * ----------------------------------------------
 */
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.NODE_ENV === 'production' }
}));



/**
 * --- SERVER ---
 * @description Initializes and starts the Express server.
 * ----------------------------------------------
 */
async function startServer() {
  try {

    /**
     * Routes:
     * @description Registers all application routes.
     * uses the custom route registry;
     * helps document the routes using swagger
     */
    routes(app);

    // app.all(/^\\/api\\/.*/, (req, res) => {
    //   res.status(404).send('Not Found');
    // });

    /**
     * Swagger api Documentation
     * @description Sets up Swagger for API documentation.
     * visit '/api-docs/' to view api docs
     */
    setupSwagger(app);

    /**
     * Setup MySql Connection
     * @description Establishes a connection to the MySQL database.
     * edit .env for connection credentials
     */
    await setup();

    /**
     *  Server Listener
     * @description Starts the server and listens for incoming connections on the specified port.
     *  specify the port to listen on
     */
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server running on port ${process.env.PORT || 3000}`)
    });

    // Graceful shutdown
    process.on('SIGTERM', async () => {
      console.log('Shutting down gracefully');
      await close();
      process.exit(0);
    });

  } catch (err) {
    console.error('Failed to start server due to database setup error:', err);
    process.exit(1);
  }
}

if (require.main === module) {
  startServer();
}

/**
 * Exporting the app for testing purposes
 * @module app
 */
module.exports = app;