
var express = require("express");

var router = express.Router();
// grabbing our models
var db = require("../models");

// get route -> index
router.get("/", function(req, res) {
  // send us to the next get function instead.
  return res.render("index");
});

// get route -> my-garden
router.get("/my-garden", function(req, res) {
  return res.render("garden", {layout: 'garden'});
});

// get route -> chat
router.get("/chat", function(req, res) {
  return res.render("chat");
});

// get route -> survey
router.get("/survey", function(req, res) {
  return res.render("survey");
});

// get route -> badges
router.get("/badges", function(req, res) {
  return res.render("badges");
});

module.exports = router;
