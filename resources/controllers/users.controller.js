const UsersDAO = require('../dao/users.dao');

/**
 * Controller function to handle retrieving all users.
 *
 * This function uses the UsersDAO to fetch all users from the data source
 * and returns them as a JSON response. If an error occurs during retrieval,
 * it sends a 500 Internal Server Error response.
 *
 * @async
 * @function usersController
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 * @returns {Promise<void>} Sends a JSON response with user data or an error message.
 */
async function usersController(req, res) {
  try {
    const users = await UsersDAO.getAllUsers();
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = { usersController };