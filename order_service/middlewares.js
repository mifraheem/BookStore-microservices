const envVar = require('dotenv').config({ path: '../.env' }); 

const jwt = require('jsonwebtoken');
const validateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, envVar.parsed.SECRET_KEY, {
            algorithms: ['HS256']
        });

        req.user = decoded;
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token has expired' });
        } else {
            return res.status(403).json({ error: 'Token is invalid' });
        }
    }
};

module.exports = validateToken;
