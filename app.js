const express = require('express');
const routes = require('./resources/routes');
const setupSwagger = require('./utils/swagger');
const { setup, close } = require('./utils/db/setup-db-connection');

require('dotenv').config();

const app = express();

app.use(express.json());

// Initialize database before starting server
async function startServer() {
  try {

    routes(app);
    setupSwagger(app);

    await setup();
    app.listen(3000, () => console.log('Server running on port 3000'));
    
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

module.exports = app;