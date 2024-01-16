const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, Member, Comment } = require("../models");
const withAuth = require("../utils/auth");

// Route to render the member's dashboard with their posts and associated comments and members
router.get("/", withAuth, async (req, res) => {
  try {
    // Fetch posts of the authenticated member with associated comments and members
    const postData = await Post.findAll({
      where: {
        member_id: req.session.member_id,
      },
      attributes: ["id", "title", "content", "created_date"],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'member_id', 'created_date'],
          include: {
            model: Member,
            attributes: ['username']
          }
        },
        {
          model: Member,
          attributes: ['username']
        }
      ]
    });

    // Map and format the post data for rendering
    const posts = postData.map((post) => post.get({ plain: true }));

    // Render the dashboard view with the posts data
    res.render("dashboard", { posts, loggedIn: true });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Route to render the form for editing a specific post
router.get("/edit/:id", withAuth, async (req, res) => {
  try {
    // Fetch a specific post with associated comments and members
    const postData = await Post.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "title", "content", "created_date"],
      include: [
        {
          model: Member,
          attributes: ['username']
        },
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'member_id', 'created_date'],
          include: {
            model: Member,
            attributes: ['username']
          }
        }
      ]
    });

    // Handle case where no post is found with the specified id
    if (!postData) {
      res.status(404).json({ message: "No post found with this id" });
      return;
    }

    // Format the post data for rendering
    const post = postData.get({ plain: true });

    // Render the edit post view with the post data
    res.render("editPost", { post, loggedIn: true });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Route to render the form for adding a new post
router.get("/new", (req, res) => {
  res.render("addPost");
});

// Export the configured router for use in other parts of the application
module.exports = router;