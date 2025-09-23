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
app.use(express.static('public'));

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
 * --- SERVER ---\n * ----------------------------------------------
 */
async function startServer() {
  try {

    /**
     * Routes:
     * uses the custom route registry;
     * helps document the routes using swagger
     */
    routes(app);

    // app.all(/^\/api\/.*/, (req, res) => {
    //   res.status(404).send('Not Found');
    // });

    /**
     * Swagger api Documentation
     * visit '/api-docs/' to view api docs
     */
    setupSwagger(app);

    /**
     * Setup MySql Connection
     * edit .env for connection credentials
     */
    await setup();

    /**
     *  Server Listener  
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
 */
module.exports = app;