const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = 3000;
const app = express();

// Configure middleware
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/the-daily-mail", { useNewUrlParser: true });

// Routes
require("./routes/apiRoutes")(app);
// require("./routes/htmlRoutes")(app);

// Start the server
app.listen(PORT, () => console.log("App running on port " + PORT + "!"));