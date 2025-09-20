const request = require('supertest');
const app = require('../server');

describe('Financial API Server', () => {

  let server;
  const PORT = process.env.PORT || 3000;

  // Start the server before running tests
  beforeAll((done) => {
    server = app.listen(4000, () => {
      console.log(`Test Server is running on PORT:${PORT}`);
      done();
    });
  });

  // Close the server after tests
  afterAll((done) => {
    server.close(() => {
      console.log('Test server is closed');
      done();
    });
  });

  /**
   * Test the GET / route
   */
  it('should return welcome message on GET /', async () => {
    const res = await request(app).get('/');

    expect(res.statusCode).toEqual(200);
    expect(res.text).toBe('Welcome to the Financial API Server');
  });
});