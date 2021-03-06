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
router.get("/api/workouts", (req, res) => {
    // Run find query on database; Return last workout
    Workout.find()
        .sort({ "day": -1 })
        .limit(1)
        .then((workout) => {
            res.json(workout);
        })
        .catch((err) => {
            console.log(err)
        });
});

router.post("/api/workouts", ({ body }, res) => {
    // Declare and set variable for new workout
    const workout = new Workout(body);

    // Run create query on database; Add new workout
    Workout.create(workout)
        .then(newWorkout => {
            res.json(newWorkout);
        })
        .catch(err => {
            console.log(err);
        });
});

router.put("/api/workouts/:id", (req, res) => {
    // Declare and set variable for workout ID
    const workoutID = req.params.id;

    // Declare and set variable for updated workout
    const updatedWorkout = req.body;

    // Run update query on database; Update current workout
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

router.get("/api/workouts/range", (req, res) => {
    // Run find query on database; Return last 7 workouts
    Workout.find({})
        .sort({ "day": -1 })
        .limit(7)
        .then((workouts) => {
            res.json(workouts);
        })
        .catch((err) => {
            console.log(err);
        });
});

// Export routes for server.js to use.
module.exports = router;