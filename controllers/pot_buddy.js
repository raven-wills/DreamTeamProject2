var express = require("express");

var router = express.Router();
// grabbing our models
var db = require("../models");

var passport = require("../config/passport");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

// Config for pusher
var Pusher = require('pusher');
var pusher = new Pusher({
  appId:     "543096",
  key:       "0a6f033fb9407c9c16ac",
  secret:    "bdad2ad595fb9707e62d",
  cluster:   "us2",
  encrypted: true
});

// HTML ROUTES
// get route -> index
router.get("/", function(req, res) {
  if (req.user) {
    return res.render("index");
  }

  // send us to the next get function instead.
  return res.render("login", { layout: 'user' });
});

// login
router.get("/login", function(req, res) {
  // If the user already has an account send them to the members page
  if (req.user) {
    res.redirect("/");
  }
  return res.render("login", { layout: "user" });
});

// login
router.get("/sign-up", function(req, res) {
  // If the user already has an account send them to the members page
  if (req.user) {
    res.redirect("/");
  }
  return res.render("signup", { layout: "user" });
});


// get route -> my-garden
router.get("/my-garden", function (req, res) {
 
  var plantsArr = [];

  // Find all sequelize function where UserId = current user's id
  db.UserPlant.findAll({
    include: [db.User],
    where: {UserId: req.user.id},
    raw: true
  }
)
    // use promise method to pass the users plants...
    .then(function (dbp) {

      // pushes users plants names into array
      for (var i = 0; i < dbp.length; i++) {
        plantsArr.push(dbp[i].plant);
      }
    
      //finds the users plants infor in the Plants db
      db.Plants.findAll({ 
        where: { commonName: [plantsArr] }
      })
        // use promise method to pass the plants...
        // renders garden page with garden layout
        .then(function (x) {
          var hbsObject = { plant: x, layout: "garden" };
          return res.render("garden", hbsObject);
        });
    });
      
    });



// GET route for retrieving all users plants
router.get("/api/my-garden", function (req, res) {
  db.UserPlant.findAll({
    include: [db.User],
    where: {UserId: req.user.id},
  }).then(function (dbPost) {
    res.json(dbPost);
  });
});

// POST route for saving a new plant
router.post("/api/my-garden", function (req, res) {

  db.UserPlant.create({
    UserId: req.user.id,
    plant: req.body.plant
  }).then(function (dbPost) {
    res.json(dbPost);
  });

});

// get route -> plants
router.get("/plants", function(req, res) {
  // .findAll sequelize function
  db.Plants.findAll({ limit: 35 })
    // use promise method to pass the plants...
    .then(function(dbp) {
      // console.log(dbp);
      // into the main index, updating the page
      var hbsObject = { plant: dbp, layout: "plants" };
      return res.render("plants", hbsObject);
    });
});

router.get("/badges", function(req, res) {
  return res.render("badges", { layout: "badges" });
});


// get route -> survey
router.get("/survey", function(req, res) {
  // send us to the next get function instead.
  return res.render("survey");
});
// Select just one plant by an id
router.get("/findp/:plantId", function(req, res) {
 
  pid=parseInt(req.params.plantId,10)

    db.Plants.find({
      where: {
        id: pid
      }
    }).then((plant)=>{
      console.log(plant)
      return res.json(plant)})
  });


// get route -> badges
router.get("/badges", function(req, res) {
  return res.render("badges");
});

// CHAT ROUTES
// get route -> chat
router.get("/chat", function(req, res) {
  return res.render("chat", { layout: "chat" });
});

// GET route for retrieving all messages
router.get("/api/chat", function(req, res) {
  db.Chat.findAll({
    include: [db.User],
    order: [["updatedAt", "ASC"]]
  }).then(function(dbPost) {
    res.json(dbPost);
  });
});

// POST route for saving a new message
router.post("/api/chat", function(req, res) {
  db.Chat.create({
    body: req.body.body,
    UserId: req.body.UserId
  }).then(function (dbPost) {
    pusher.trigger('presence-groupChat', 'message_sent', { message: "hello world" });
    console.log("message_sent");
    res.json(dbPost);
  });
});

router.post('/join-chat', (req, res) => {
  // store username in session
  req.session.userId = req.body.userId;
  req.session.username = req.body.username
  res.json('Joined');
});

router.post('/pusher/auth', (req, res) => {
  const socketId = req.body.socket_id;
  const channel = req.body.channel_name;
  // Retrieve username from session and use as presence channel user_id
  const presenceData = {
      user_id: req.session.userId,
      user_info: {
        name: req.session.username,
      }
  };
  const auth = pusher.authenticate(socketId, channel, presenceData);
  res.send(auth);
});

// get route -> chat
router.get("/create", function(req, res) {
  return res.render("create");
});

// Using the passport.authenticate middleware with our local strategy.
// If the user has valid login credentials, send them to the members page.
// Otherwise the user will be sent an error
router.post("/api/login", passport.authenticate("local"), function(req, res) {
  // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
  // So we're sending the user back the route to the members page because the redirect will hrouteren on the front end
  // They won't get this or even be able to access this page if they aren't authed
  res.json("/");
});

// Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
// how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
// otherwise send back an error
router.post("/api/signup", function(req, res) {
  console.log(req.body);
  db.User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  })
    .then(function() {
      res.redirect(307, "/api/login");
    })
    .catch(function(err) {
      console.log(err);
      res.json(err);
      // res.status(422).json(err.errors[0].message);
    });
});

// Route for logging user out
router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

// Route for getting some data about our user to be used client side
router.get("/api/user_data", function(req, res) {
  if (!req.user) {
    // The user is not logged in, send back an empty object
    res.json({});
  } else {
    // Otherwise send back the user's email and id
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      name: req.user.name,
      email: req.user.email,
      id: req.user.id
    });
  }
});

module.exports = router;
