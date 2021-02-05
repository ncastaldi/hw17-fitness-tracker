// Require external npm packages
const express = require("express");

// Declare local instances
const app = express();

// Delcare listening port for Express server
const PORT = process.env.PORT || 8080;

// Express Middleware: Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Express Middleware: Parses JSON and URL
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Starts Express server listening on predefined port
app.listen(PORT, () => {
    console.log(`Your server is running on http://localhost:${PORT}`);
})