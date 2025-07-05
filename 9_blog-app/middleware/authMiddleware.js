const jwt = require('jsonwebtoken');

function checkForAuthenticationCookie(cookieName) {
    return (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName];
        if (!tokenCookieValue) {
            return next();
        }

        try {
            const userPayload = jwt.verify(tokenCookieValue, process.env.JWT_SECRET || 'your-secret-key');
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
