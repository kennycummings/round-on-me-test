const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Define the Post model by extending the Sequelize Model class
class Post extends Model { }

// Initialize the Post model with specific attributes and their data types
Post.init(
    {
        // Unique identifier for the post
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        // Title of the post, must not be null
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // Content of the post, must not be null
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        // Member ID associated with the post, creating a foreign key relationship with the "member" model
        member_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'member',
                key: 'id',
            },
        },
        // Date when the post was created, defaulting to the current date
        created_date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: new Date(),
        },
    },
    {
        // Sequelize instance for database connection
        sequelize,
        // Model name in singular form
        modelName: 'post',
        // Freeze the table name to be the same as the model name
        freezeTableName: true,
        // Use underscored naming for the database table (e.g., post_table)
        underscored: true,
    }
);

// Export the Post model for use in other parts of the application
module.exports = Post;