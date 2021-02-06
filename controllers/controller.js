// Require external npm packages
const express = require("express");
const path = require("path");

// Import models
const Workout = require("../models/workout");

// Define Express Router
const router = express.Router();

// Define HTML View Routes
router.get("/", (function (req, res) {
    res.render("index");
}));

router.get("/stats", (function (req, res) {
    res.sendFile(path.join(__dirname, "../public/stats.html"));
}));

router.get("/exercise", (function (req, res) {
    res.sendFile(path.join(__dirname, "../public/exercise.html"));
}));

// Define API Routes
router.post("/api/workouts", ({ body }, res) => {
    const workout = new Workout(body);

    Workout.create(workout)
        .then(banana => {
            res.json(banana);
        }).catch(err => {
            res.json(err);
        });
});

// Export routes for server.js to use.
module.exports = router;