// Import necessary modules and packages
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');  // Importing routes defined in the controllers directory
const helpers = require('./utils/helpers');  // Importing custom helper functions

const sequelize = require('./config/connection');  // Importing Sequelize for database connection
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Create an Express application
const app = express();

// Set the port number to use either the environment's port or 3001 as a default
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

// Session configuration
const sess = {
  secret: 'Super secret secret',  // Secret used to sign the session ID cookie
  cookie: {
    maxAge: 600000,     // Maximum age of the session cookie in milliseconds
    httpOnly: true,     // Ensures that the cookie is only accessible by the web server
    secure: false,      // If true, the cookie will only be sent over HTTPS
    sameSite: 'strict', // Restricts the cookie to be sent only to the same site as the request
  },
  resave: false,        // Do not save the session if it was not modified
  saveUninitialized: true,  // Save new sessions that have not been modified

  // Store session data in Sequelize for persistence
  store: new SequelizeStore({
    db: sequelize  // Use the Sequelize instance for session storage
  })
};

// Use sessions in the Express application
app.use(session(sess));

// Set up template engine and view engine for rendering HTML
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Use the defined routes in the application
app.use(routes);

// Sync the Sequelize models with the database and start the Express application
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});