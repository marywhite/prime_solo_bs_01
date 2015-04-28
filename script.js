var apikey = 'e27fa347f5134d05d053b02acb00c1153f892615';
var extras = [];

// Use this function to do stuff with your results. 
// It is called after 'search' is executed.
function searchCallback(results) {
    $(".search-results").empty();
    extras = results.slice(9);
    for (var i = 0; i < 9; i++) {
    	if ((i % 3) == 0) {
			$(".search-results").append('<div class="row"></div>');
		}
    	game = results[i];
    	var button = '<button class="btn btn-sm btn-success remove"> remove content </button>'
   		var image = '<img class="img-thumbnail hidden-xs hidden-s" src="' + game.image.icon_url + '"/><br>'
    	var deck = '<div>' + game.deck + '</div>'
    	var name = '<p class="lead text-center">' + game.name + '</p><br>'
		var el = '<div class="col-md-4 well">' + image  + name + deck + button + '</div>'
		$(".row").last().append(el).hide().delay(200).fadeIn("slow");
	}
}

function reposition (){
	var cells = $(".search-results").children().children();
	var newContent = extras.shift();
	console.log(newContent);
	$(".search-results").empty();
	for (var i = 0; i < cells.length; i++){
		if ((i % 3) == 0) {
			$(".search-results").append('<div class="row"></div>');
		}
		$(".row").last().append(cells[i]);
	}
	$(".row").last().append('<div class="col-md-4 well">' + '<img class="img-thumbnail hidden-xs hidden-s" src="' + newContent.image.icon_url + '"/><br><p class="lead text-center">' + newContent.name + '</p><br><div>' + newContent.deck + '</div><button class="btn btn-sm btn-success remove"> remove content </button>' + '</div>');
}



$(document).ready(function() {

	$(".searchBtn").click(function(){
		var searchTerm = $("#searchField").val();
		search(searchTerm);
	})

	$(".search-results").on("click", ".remove", function() {
		$(this).parent().fadeOut("slow", function(){
			$(this).remove();
			reposition();
		});
	});
});

// HELPER FUNCTION
// Executes a search using 'query' and runs searchCallback on the results of a success.

function search(query){

	$.ajax ({
	    type: 'GET',
	    dataType: 'jsonp',
	    crossDomain: true,
	    jsonp: 'json_callback',
	    url: 'http://www.giantbomb.com/api/search/?format=jsonp&resources=game&api_key=' + apikey +'&query=' + encodeURI(query),
	    complete: function() {
	        console.log('ajax complete');
	    },
	    success: function(data) {
	        searchCallback(data.results);
	    }
	});

}
