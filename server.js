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
 * --- ROUTES ---\n * ----------------------------------------------
 */
routes(app);

/**
 * --- SERVER ---\n * ----------------------------------------------
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