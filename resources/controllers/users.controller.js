const jwt = require('jsonwebtoken')
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

  async function registerUser(req, res) {

    try {
      const { email, password, name } = req.body;

      const existingUser = await UsersDAO.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }

      /** Hash the password */
      const hashedPassword = await bcrypt.hash(password, 10);

      /**
       * Create a new user
       */
      const newUser = UsersDAO.createUser({
        email,
        password: hashedPassword,
        name
      });

      /**
       * Issue JWT
       */


      /**
       * Set Session Cookie
       */
      

    } catch (err) {
      throw err;
    } finally {
      connection.release();
    }
  }


async function loginController(req, res) {
  try {
    const { email, password } = req.body;
    const user = await UsersDAO.loginUser(email, password);

    if (!user) {
      return res.status(401).json({
        error: 'Invalid email or password'
      });
    }

    /** 
     * Long-lived Access Token
     */
    const accessToken = jwt.sign(
      { user_id: user.user_id, email: user.email },
      SECRET_KEY,
      { expiresIn: '7d' }
    );

    /** 
     * Short-lived Access Token
     * (stored in session)
     */
    const refreshToken = jwt.sign(
      { user_id: user.user_id, email: user.email },
      SECRET_KEY,
      { expiresIn: '7d' }
    );

    req.session.refreshToken = refreshToken;
    req.session.userId = user.user_id;

    /**
     * Send the token in the response
     */
    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });

    res.json({ message: 'Login successful.', token })
  } catch (error) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

function logoutController(req, res) {
  req.session.destroy(() => {
    res.clearCookie('auth_token');
    res.json({ message: 'Logged out successfully' });
  });
}

module.exports = {
  registerUser,
  usersController,
  loginController,
  logoutController,
}