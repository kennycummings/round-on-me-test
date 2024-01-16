const sequelize = require("../config/connection");
const { Post, Member, Comment } = require("../models");
const router = require("express").Router();

// Route to render the homepage with all posts and associated comments and members
router.get("/", async (req, res) => {
  try {
    // Fetch all posts with associated comments and members
    const postData = await Post.findAll({
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
    
    // Render the homepage view with the posts data
    res.render("homepage", { posts, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Route to render the login page or redirect to the homepage if already logged in
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
  } else {
    res.render("login");
  }
});

// Route to render the sign-up page
router.get("/signUp", (req, res) => {
  res.render("signUp");
});

// Route to render a single post with its associated comments and member
router.get("/post/:id", async (req, res) => {
  try {
    // Fetch a specific post with associated comments and member
    const postData = await Post.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "content", "title", "created_date"],
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

    // Handle case where no post is found with the specified id
    if (!postData) {
      res.status(404).json({ message: "No post found with this id" });
      return;
    }

    // Format the post data for rendering
    const post = postData.get({ plain: true });

    // Render the single post view with the post data
    res.render("singlePost", { post, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Export the configured router for use in other parts of the application
module.exports = router;