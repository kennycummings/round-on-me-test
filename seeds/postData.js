const { Post } = require("../models");

// Sample data for seeding posts
const postData = [
    {
        title: "Father's Day Matchup",
        content: "$65 entry per member. All donations go to new cabanas at the resort.",
        member_id: 1,
    },
    {
        title: "IMMEDIATE: Seeking a 4th",
        content: "Our 4th dropped out last minute. If anyone is interested THIS ROUND ON ME!!!",
        member_id: 2,
    },
    {
        title: "Driving Competition",
        content: "Winning member will get a $250 credit to the pro shop",
        member_id: 3,
    },
    {
        title: "Junior Clinic",
        content: "Topics Covered: Basic Grip & Stance, Swing Basics, Short Game Skills, and Golf Etiquette",
        member_id: 4,
    }
];

// Function to seed posts into the database
const seedPosts = async () => {
    try {
        // Using Sequelize's bulkCreate to insert multiple posts at once
        await Post.bulkCreate(postData);
        console.log('Posts seeded successfully');
    } catch (error) {
        // Handling errors that may occur during the seeding process
        console.error('Error seeding posts:', error);
    }
};

module.exports = seedPosts;