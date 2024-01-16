const { Comment } = require('../models');

// Sample data for seeding comments
const commentData = [
    {
        comment_text: "Cover table manners while you're at it 🙏🏻",
        member_id: 1,
        post_id: 4
    },
    {
        comment_text: "No one is outdriving me! I've had my eyes on a polo and vest combo since the 2011 Summer Classic series.",
        member_id: 2,
        post_id: 3
    },
    {
        comment_text: "My +6 handicap is nothing to scoff at. I'd be happy to share my wisdom as your partner.",
        member_id: 3,
        post_id: 2
    },
    {
        comment_text: "I shall bring only my favorite child.",
        member_id: 4,
        post_id: 1
    }
];

// Function to seed comments into the database
const seedComments = async () => {
    try {
        // Using Sequelize's bulkCreate to insert multiple comments at once
        await Comment.bulkCreate(commentData);
        console.log('Comments seeded successfully');
    } catch (error) {
        // Handling errors that may occur during the seeding process
        console.error('Error seeding comments:', error);
    }
};

module.exports = seedComments;