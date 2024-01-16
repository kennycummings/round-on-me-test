const express = require('express');
const router = express.Router();

// Importing member, post, and comment routes
const memberRoutes = require('./memberRoutes.js');
const postRoutes = require('./postRoutes.js');
const commentRoutes = require('./commentRoutes.js');

// Middleware to handle routes for members
router.use('/members', memberRoutes);

// Middleware to handle routes for posts
router.use('/posts', postRoutes);

// Middleware to handle routes for comments
router.use('/comments', commentRoutes);

// Export the configured router for use in other parts of the application
module.exports = router;