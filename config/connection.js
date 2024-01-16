// Import Sequelize library
const Sequelize = require('sequelize');

// Load environment variables from the .env file
require('dotenv').config();

// Initialize Sequelize instance
let sequelize;

// Check if JAWSDB_URL environment variable is present (indicating a production environment)
if (process.env.JAWSDB_URL) {
    // Use JAWSDB_URL for connection in production
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
    // Use local database connection details for development
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host: 'localhost',
            dialect: 'mysql',
            port: 3306
        }
    );
}

// Export the Sequelize instance for use in other parts of the application
module.exports = sequelize;