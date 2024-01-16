const router = require('express').Router();

// Importing routes for different sections of the application
const apiRoutes = require('./api/index.js');
const homeRoutes = require('./homeRoutes.js');
const dashboardRoutes = require('./dashboardRoutes.js');

// Middleware to handle routes for the home section of the application
router.use('/', homeRoutes);

// Middleware to handle API routes
router.use('/api', apiRoutes);

// Middleware to handle routes for the dashboard section of the application
router.use('/dashboard', dashboardRoutes);

// Middleware to handle requests for undefined routes (404 Not Found)
router.use((req, res) => {
    res.status(404).end();
});

// Export the configured router for use in other parts of the application
module.exports = router;