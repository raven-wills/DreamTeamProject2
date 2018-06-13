var express = require("express");

var router = express.Router();
// grabbing our models
var db = require("../models");

var passport = require("../config/passport");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");


// HTML ROUTES
// get route -> index
router.get("/", function (req, res) {

  if (req.user) {
    return res.render("index");
  }

  // send us to the next get function instead.
  return res.render("signup", { layout: 'user'});
});

// login
router.get("/login", function (req, res) {
  // If the user already has an account send them to the members page
  if (req.user) {
    res.redirect("/");
  }
  return res.render("login", { layout: 'user'});
});

// login
router.get("/sign-up", function (req, res) {
  // If the user already has an account send them to the members page
  if (req.user) {
    res.redirect("/");
  }
  return res.render("signup", { layout: 'user'});
});

// get route -> my-garden
router.get("/my-garden", function (req, res) {
  // .findAll sequelize function
  db.Plants.findAll()
    // use promise method to pass the plants...
    .then(function (dbp) {
      // console.log(dbp);
      // into the main index, updating the page
      var hbsObject = { plant: dbp, layout: "garden" };
      return res.render("garden", hbsObject);
    });
});


// get route -> plants
router.get("/plants", function (req, res) {
  // .findAll sequelize function
  db.Plants.findAll({ limit: 25 })
    // use promise method to pass the plants...
    .then(function (dbp) {
      // console.log(dbp);
      // into the main index, updating the page
      var hbsObject = { plant: dbp, layout: "main" };
      return res.render("plants", hbsObject);
    });

});

// get route -> survey
router.get("/survey", function (req, res) {
  return res.render("survey");
});

// get route -> badges
router.get("/badges", function (req, res) {
  return res.render("badges");
});


// CHAT ROUTES

// get route -> chat
router.get("/chat", function (req, res) {
  return res.render("chat", { layout: 'chat' });
});

// GET route for retrieving all messages
router.get("/api/chat", function (req, res) {
  db.Chat.findAll({
    include: [db.User],
    order: [['updatedAt', 'ASC']]
  }).then(function (dbPost) {
    res.json(dbPost);
  });
});

// POST route for saving a new message
router.post("/api/chat", function (req, res) {
  db.Chat.create({
    body: req.body.body,
    UserId: req.body.UserId
  }).then(function (dbPost) {
    res.json(dbPost);
  });
});

// get route -> chat
router.get("/create", function (req, res) {
  return res.render("create");
});

// Using the passport.authenticate middleware with our local strategy.
// If the user has valid login credentials, send them to the members page.
// Otherwise the user will be sent an error
router.post("/api/login", passport.authenticate("local"), function (req, res) {
  // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
  // So we're sending the user back the route to the members page because the redirect will hrouteren on the front end
  // They won't get this or even be able to access this page if they aren't authed
  res.json("/");
});

// Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
// how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
// otherwise send back an error
router.post("/api/signup", function (req, res) {
  console.log(req.body);
  db.User.create({
    email: req.body.email,
    password: req.body.password
  }).then(function () {
    res.redirect(307, "/api/login");
  }).catch(function (err) {
    console.log(err);
    res.json(err);
    // res.status(422).json(err.errors[0].message);
  });
});

// Route for logging user out
router.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

// Route for getting some data about our user to be used client side
router.get("/api/user_data", function (req, res) {
  if (!req.user) {
    // The user is not logged in, send back an empty object
    res.json({});
  }
  else {
    // Otherwise send back the user's email and id
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  }
});

module.exports = router;

