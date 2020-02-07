$("#viewscrape").on("click", function() {
	$.getJSON("/api/articles", function(data) {
		// For each one
		for (let i = 0; i < data.length; i++) {
			// Display the apropos information on the page
			$("#scrapedArticles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
		}
	});
});