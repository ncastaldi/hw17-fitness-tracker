// Require external npm packages
const express = require("express");
const mongoose = require("mongoose");

// Declare local instances
const app = express();

// Delcare listening port for Express server
const PORT = process.env.PORT || 8080;

// Define Mongoose connection
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/fitness-tracker", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});

const connection = mongoose.connection;

connection.on("connected", () => {
    console.log("Mongoose successfully connected.");
});

connection.on("error", (err) => {
    console.log("Mongoose connection error: " + err);
});

// Express Middleware: Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Express Middleware: Parses JSON and URL
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Starts Express server listening on predefined port
app.listen(PORT, () => {
    console.log(`Your server is running on http://localhost:${PORT}`);
});