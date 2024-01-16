// Importing the Sequelize instance for database connection
const sequelize = require('../config/connection');

// Importing functions to seed memberss, posts, and comments
const seedMembers = require('./memberData');
const seedPosts = require('./postData');
const seedComments = require('./commentData');

// Function to seed the entire database with members, posts, and comments
const seedDB = async () => {
  try {
    // Synchronize the database and force it to drop and recreate tables
    await sequelize.sync({ force: true });

    // Call functions to seed members, posts, and comments
    await seedMembers();
    await seedPosts();
    await seedComments();

    // Log success message and exit the process
    process.exit(0);
  } catch (error) {
    // Log error message and exit the process with an error code
    console.error('Error seeding the database:', error);
    process.exit(1);
  }
};

// Call the seedDB function to start the seeding process
seedDB();