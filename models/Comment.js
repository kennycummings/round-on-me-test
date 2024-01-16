const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// Define the Comment model by extending the Sequelize Model class
class Comment extends Model { }

// Initialize the Comment model with specific attributes and their data types
Comment.init(
  {
    // Unique identifier for the comment
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    // Text content of the comment with validation for a minimum length of 3 characters
    comment_text: {
      type: DataTypes.STRING,
      validate: {
        len: [3],
      },
    },
    // Member ID associated with the comment, creating a foreign key relationship with "member" model
    member_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "member",
        key: "id",
      },
    },
    // Post ID associated with the comment, creating a foreign key relationship with the "post" model
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "post",
        key: "id",
      },
    },
    // Date when the comment was created, defaulting to the current date
    created_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    // Sequelize instance for database connection
    sequelize,
    // Model name in singular form
    modelName: "comment",
    // Use underscored naming for the database table (e.g., comment_table)
    underscored: true,
    // Freeze the table name to be the same as the model name
    freezeTableName: true,
  }
);

// Export the Comment model for use in other parts of the application
module.exports = Comment;