const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN_HERE

  if (!token) {
      return res.status(401).json({ error: 'No token provided' });
  }

  try {
      const decoded = jwt.verify(token, 'django-insecure-fnvdaau90ghv4dfbxnikx*sn2h4rcprla$s12e&pl9y5=j3+w+', {
          algorithms: ['HS256']
      });
      
      req.user = decoded; 
      next();
  } catch (err) {
      console.error('JWT Error:', err);
      if (err.name === 'TokenExpiredError') {
          return res.status(401).json({ error: 'Token has expired' });
      } else {
          return res.status(403).json({ error: 'Token is invalid' });
      }
  }
};

module.exports = validateToken;
