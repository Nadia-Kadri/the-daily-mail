const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
// Scraping dependencies
const axios = require("axios");
const cheerio = require("cheerio");

const PORT = 3000;

// Requiring `Articles`
const db = require("./models");

const app = express();

// Configure middleware
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/the-daily-mail", { useNewUrlParser: true });

app.get("/articles", function(req, res) {
	db.Article.find({})
		.then(data => res.json(data))
		.catch(err => res.json(err));
});

// Scrape data from WSJ and place it into Articles collection within the-daily-mail db
app.get("/scrape", function(req, res) {
  axios.get("https://www.wsj.com/").then(function(res) {
    // Load the html body from axios into cheerio
    const $ = cheerio.load(res.data);
    
    $("article").each(function(i, element) {
      let title = $(element).children().text();
      let link = $(element).find("a").attr("href");

      if (title && link) {
        // Insert the data in the-daily-mail db
        db.Article.create({title: title, link: link})
          .then(data =>console.log(data))
          .catch(err => console.log(err.message));
      }
    });
  });
  res.send("Scrape Complete");
});

// Start the server
app.listen(PORT, () => console.log("App running on port " + PORT + "!"));