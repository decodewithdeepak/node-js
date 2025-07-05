const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

function checkForAuthenticationCookie(cookieName) {
    return (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName];
        if (!tokenCookieValue) {
            return next();
        }

        try {
            const userPayload = jwt.verify(tokenCookieValue, JWT_SECRET);
            req.user = userPayload;
        } catch (error) {
            // Invalid token, clear the cookie
            res.clearCookie(cookieName);
        }

        return next();
    };
}

function requireAuth(req, res, next) {
    if (!req.user) {
        return res.redirect('/login');
    }
    next();
}

module.exports = {
    checkForAuthenticationCookie,
    requireAuth,
};
