const Member = require('./Member');
const Post = require('./Post');
const Comment = require('./Comment');

// Define associations between Member and Post models
Member.hasMany(Post, {
  foreignKey: 'member_id'  // Each member can have multiple posts with the specified foreign key
});

Post.belongsTo(Member, {
  foreignKey: 'member_id',  // A post belongs to a member with the specified foreign key
  onDelete: "cascade"  // Cascade delete posts associated with a member when the member is deleted
});

// Define associations between Member and Comment models
Member.hasMany(Comment, {
  foreignKey: 'member_id',  // Each member can have multiple comments with the specified foreign key
  onDelete: "cascade"  // Cascade delete comments associated with a member when the member is deleted
});

Comment.belongsTo(Member, {
  foreignKey: 'member_id',  // A comment belongs to a member with the specified foreign key
  onDelete: "cascade"  // Cascade delete comments associated with a member when the member is deleted
});

// Define associations between Post and Comment models
Post.hasMany(Comment, {
  foreignKey: 'post_id',  // Each post can have multiple comments with the specified foreign key
  onDelete: "cascade"  // Cascade delete comments associated with a post when the post is deleted
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id',  // A comment belongs to a post with the specified foreign key
  onDelete: "cascade"  // Cascade delete comments associated with a post when the post is deleted
});

// Export Member, Post, and Comment models with their associations
module.exports = { Member, Post, Comment };