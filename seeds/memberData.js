// Importing the Member model from the models directory
const { Member } = require('../models');

// Sample data for seeding members
const memberData = [
    {
        username: 'CharlesWorthingtonIII',
        password: 'BentleyMaybach'
    },
    {
        username: 'PenelopeAshford',
        password: '1$TCLA$$'
    },
    {
        username: 'ReginaldKingsley',
        password: 'g0lfK1ng'
    },
    {
        username: 'AlexandraMontgomery',
        password: 'seriouscatlady'
    }
];

// Function to seed members into the database
const seedMembers = async () => {
    try {
        // Using Sequelize's bulkCreate to insert multiple members at once
        await Member.bulkCreate(memberData);
        console.log('Members seeded successfully');
    } catch (error) {
        // Handling errors that may occur during the seeding process
        console.error('Error seeding members:', error);
    }
};

// Export the seedMembers function for use in other parts of the application
module.exports = seedMembers;