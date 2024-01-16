// Middleware function to check if a member is authenticated
const withAuth = (req, res, next) => {
    // If there is no member ID in the session, return a 401 Unauthorized status and redirect to login
    if (!req.session.member_id) {
        return res.status(401).redirect('/login');
    } else {
        // If there is a member ID in the session, call the next middleware or route handler
        next();
    }
};

// Export the withAuth middleware for use in other parts of the application
module.exports = withAuth;
