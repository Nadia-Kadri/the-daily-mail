// Requiring `Articles`
const db = require("../models");
// Scraping dependencies
const axios = require("axios");
const cheerio = require("cheerio");

module.exports = function(app) {

	app.get("/api/articles", function(req, res) {
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

}