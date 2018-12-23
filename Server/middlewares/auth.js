const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied. No token provided.');

    try {
        const decoded = jwt.verify(token, config.secretKey());
        req.user = decoded;
        if (req.user.id == 4) return res.status(403).send('Access denied');
        next();
    }
    catch (ex) {
        res.status(400).send('Invalid token.');
    }
}