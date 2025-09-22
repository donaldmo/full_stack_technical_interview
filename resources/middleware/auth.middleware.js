const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET || 'supersecret';

function authenticate(req, res, next) {
  const token = req.cookies?.auth_token || req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      const refreshToken = req.session?.refreshToken;
      if (!refreshToken) return res.status(403).json({ error: 'Forbidden' });

      jwt.verify(refreshToken, SECRET_KEY, (err, decodedRefresh) => {
        if (err) return res.status(403).json({ error: 'Forbidden' });

        const newAccessToken = jwt.sign(
          { user_id: decodedRefresh.user_id },
          SECRET_KEY,
          { expiresIn: '15m' }
        );

        res.cookie('auth_token', newAccessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
        });

        req.user = decodedRefresh;
        return next();
      });
    } else {
      req.user = decoded;
      next();
    }
  });
}

module.exports = authenticate;
