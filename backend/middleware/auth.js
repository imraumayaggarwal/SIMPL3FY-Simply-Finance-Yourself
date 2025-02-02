const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    let token = req.header('Authorization');
    console.log("Received Token:", token);  // Log the token

    // If token exists with 'Bearer' prefix, remove it
    if (token && token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);  // Remove 'Bearer ' from the token
    }

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};
