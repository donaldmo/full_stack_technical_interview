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


require('dotenv').config();
const app = express();


/**
 * Middleware for parsing JSON and urlencoded data
 * and enabling Cross-Origin Resource Sharing (CORS).
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


/**
 * --- ROUTES ---
 */
app.get('/', (req, res) => {
  res.send('Welcome to the Financial API Server');
});

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