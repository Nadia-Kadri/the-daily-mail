const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
// Scraping dependencies
var axios = require("axios");
var cheerio = require("cheerio");

const PORT = 3000;

// Requiring the `Articles` model within models folder
const db = require("./models");

const app = express();

// Configure middleware
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/the-daily-mail", { useNewUrlParser: true });

// Example data to put into database
const data = {
  title: "Article Title",
	link: "Article Link"
};

// When the server starts, create and save a new Article to the db using the data object
db.Article.create(data)
  .then(data =>console.log(data))
  .catch(err => console.log(err.message));

app.get("/articles", function(req, res) {
	db.Article.find({})
		.then(data => res.json(data))
		.catch(err => res.json(err));
});

// Scrape data from WSJ and place it into Articles collection within the-daily-mail db
app.get("/scrape", function(req, res) {
  axios.get("https://www.wsj.com/").then(function(res) {
    // Load the html body from axios into cheerio
    var $ = cheerio.load(res.data);
    
    $("article").each(function(i, element) {
      var title = $(element).children().text();
      var link = $(element).find("a").attr("href");

      console.log(title + link)

      // if (title && link) {
      //   // Insert the data in the scrapedData db
      //   db.Article.insert({title: title, link: link},
      //   (err, inserted) => {
      //     if (err) 
      //       console.log(err);
      //     else 
      //       console.log(inserted);
      //   });
      // }
    });
  });
  res.send("Scrape Complete");
});

// Start the server
app.listen(PORT, () => console.log("App running on port " + PORT + "!"));