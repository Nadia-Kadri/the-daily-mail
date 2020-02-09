$(document).ready(function() {

  $.get("/api/scrape").then(function(data) {    
    createCard(data)
	});

	$.get("/api/articles").then(function(data) {    
    createCard(data)
  });

});

function createCard (data) {
	for (let i = 0; i < data.length; i++) {
		$("#scrapedArticles").append(`
      <div class="card">
        <div class="card-header">
          <h3>
            <a class="article-link" target="_blank" href="${data[i].link}">${data[i].title}</a>
          </h3>
        </div>
        <div class="card-body">
          ${data[i].summary}
          <hr>
          <div class="note-display" id="note-display${data[i]._id}">Article Notes:</div>
          <div>Add/Update Note:</div>
          <textarea class='bodyinput' id="note${data[i]._id}" name='body'></textarea><br>
          <button type="button" class="btn btn-success add-note" id="${data[i]._id}">Submit</button>
        </div>
      </div>
    `);

    if (data[i].note) {
      $(`#note-display${data[i]._id}`).html(`Article Note: ${data[i].note.body}`)
    } else {
      $(`#note-display${data[i]._id}`).html(`Article Note: You currently do not have a note saved for this article, add one below.`)
    }
	}
}

$(document).on("click", ".add-note", function() {
  const articleId = $(this).attr("id")
  const articleNote = $(`#note${articleId}`).val()

  $.ajax({
    method: "POST",
    url: "/articles/" + articleId,
    data: {
      body: articleNote
    }
  })
  .then(function(data) {
    console.log(data);
  });

  $(`#note${articleId}`).val("");

  $.get("/api/articles").then(function(data) {    
    createCard(data)
  });
});
