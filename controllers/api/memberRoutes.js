const router = require("express").Router();
const { Member, Post, Comment } = require("../../models");

// Route to get all members (excluding passwords)
router.get("/", async (req, res) => {
  try {
    const memberData = await Member.findAll({
      attributes: { exclude: ["password"] },
    });
    res.json(memberData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Route to get a specific member by ID (excluding password) and include associated posts and comments
router.get("/:id", async (req, res) => {
  try {
    const memberData = await Member.findOne({
      attributes: { exclude: ["password"] },
      where: { id: req.params.id },
      include: [
        {
          model: Post,
          attributes: ['id', 'title', 'content', 'created_date']
        },
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'created_date'],
          include: {
            model: Post,
            attributes: ['title']
          }
        },
        {
          model: Post,
          attributes: ['title'],
        }
      ]
    });

    // Handle case where no member is found with the specified id
    if (!memberData) {
      res.status(404).json({ message: "No member found with this id" });
      return;
    }

    res.json(memberData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Route to create a new member
router.post("/", async (req, res) => {
  try {
    const memberData = await Member.create({
      username: req.body.username,
      password: req.body.password,
    });

    // Save member session information upon successful member creation
    req.session.save(() => {
      req.session.member_id = memberData.id;
      req.session.username = memberData.username;
      req.session.loggedIn = true;

      res.json(memberData);
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Route to handle member login
router.post("/login", async (req, res) => {
  try {
    const memberData = await Member.findOne({
      where: { username: req.body.username },
    });

    // Handle case where no member is found with the specified username
    if (!memberData) {
      res.status(400).json({ message: "No member with that username!" });
      return;
    }

    // Check if the provided password is valid
    const validPassword = memberData.checkPassword(req.body.password);

    // Handle case where the provided password is incorrect
    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password!" });
      return;
    }

    // Save member session information upon successful login
    req.session.save(() => {
      req.session.member_id = memberData.id;
      req.session.username = memberData.username;
      req.session.loggedIn = true;

      res.json({ member: memberData, message: "You are now logged in!" });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Route to handle member logout
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    // Destroy the session upon logout
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    // Return a 404 status if no session is found
    res.status(404).end();
  }
});

// Export the configured router for use in other parts of the application
module.exports = router;