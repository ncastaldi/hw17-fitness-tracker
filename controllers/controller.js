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
    // Declare and set variable for new workout
    const workout = new Workout(body);

    // Run create query on database
    Workout.create(workout)
        .then(newWorkout => {
            res.json(newWorkout);
        }).catch(err => {
            res.json(err);
        });
});

router.put("/api/workouts/:id", (req, res) => {
    // Declare and set variable for workout ID
    const workoutID = req.params.id;

    // Declare and set variable for updated workout
    const updatedWorkout = req.body;

    // Run update query on database
    Workout.findByIdAndUpdate(workoutID, {
        $push: { exercises: updatedWorkout }
    })
        .then((workout) => {
            res.json(workout);
        })
        .catch((err) => {
            console.log(err);
        });
});

// Export routes for server.js to use.
module.exports = router;