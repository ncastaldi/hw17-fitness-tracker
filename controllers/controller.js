// Require external npm packages
const express = require("express");

// Define Express Router
const router = express.Router();

router.get("/", (function(req, res) {
    res.render("index");
}));

// Export routes for server.js to use.
module.exports = router;