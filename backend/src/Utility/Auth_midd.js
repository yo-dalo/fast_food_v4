const jwt = require('jsonwebtoken');

function checkCookieAuth(req, res, next) {
    const authCookie = req.cookies.authToken; // Replace 'authToken' with your cookie name
console.log(req.cookies)
    if (!authCookie) {
        return res.status(401).json({ login: false });
    }

    try {
        const decoded = jwt.verify(authCookie, process.env.JWT_SECRET_KEY);
        console.log('login:', decoded);
        req.user = decoded;  // You can pass the decoded token data to the next middleware via `req.user`
        next();
    } catch (err) {
        console.log('Token is invalid:', err.message);
        return res.status(403).json({ message: 'Forbidden: Invalid token' });
    }
}

module.exports = checkCookieAuth;