$("#scrape").on("click", function() {

	$.get("/api/scrape").then(function(data) {    
    appendData(data)
	});

	$.get("/api/articles").then(function(data) {    
    appendData(data)
  });
});

function appendData (data) {
	for (let i = 0; i < data.length; i++) {
		$("#scrapedArticles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
	}
}

$("#clear").on("click", function() {
  $("#scrapedArticles").empty()
});