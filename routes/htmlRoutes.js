module.exports = function(app) {

	app.get("/", function(req, res) {
		res.render("home");
	});

	app.get("/viewscrape", function(req, res) {
		res.render("viewscrape");
	});
	
};