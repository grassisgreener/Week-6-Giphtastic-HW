// page loads
$(document).ready(function()
{
	var topics = ['Samuel L. Jackson', 'Al Pacino', 'Sarah Jessica Parker', 'Molly Shannon', 'Amy Schumer', 'Oprah Winfrey', 'Johnny Depp', 'Ken Jeong', 'Jon Heder', 'Tina Fey'];

	function renderButton()
	{

		$('#topicsView').empty();

		for (var i = 0; i < topics.length; i++)
		{
			// add classes and button to HTML
			var a = $('<button type="button">')
			a.addClass('topicButton');
			a.addClass('btn btn-primary');
			a.attr('data-name', topics[i]);
			a.text(topics[i]);
			$('#topicsView').append(a);
		}
	}
     renderButton();
	// function handler when a button is clicked
	$('#addTopic').on('click', function(){
		console.log('button clicked'); 
// gets input from textbox
		var topic = $('#topicInput').val().trim();
		console.log("topic");
		if (topic != "")
		{
			topics.push(topic);

			renderButton();
		}
		else 
		{
			$('#topicInput').attr("placeholder","Please enter a topic to search.")
			renderButtons();
		}

		return false;
	});

	// function for displaying gifs 
	function displaytopicGif()
	{
		$('#gifView').empty();
		var topic = $(this).attr('data-name');
		console.log(topic);
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topics + "&api_key=dc6zaTOxFJmzC&limit=10";

		$.ajax({url: queryURL, method: 'GET'})
		.done(function(response)
		{
			var topicDiv = $('<div class="topicImage">');
			console.log(response);
			for (i=0; i < response.data.length; i++)
			{
				var stillImage = response.data[i].images.fixed_height_still.url;
				console.log(stillImage);

				var playImage = response.data[i].images.fixed_height.url;
				console.log("Moving" + playImage);

				var rating = response.data[i].rating;
				console.log(rating);

				// rating display
				var paragraph = $('<p1>').text( "Rating: " + rating.toUpperCase());
				topicDiv.append(paragraph);

				// var image = $("<img>");
				// image.attr("src", still);
				// image.attr("playsrc", playImage);
				// image.attr("stopsrc", stillImage);

				var image = $("<img>").attr("src", stillImage);
				image.attr("playsrc", playImage);
				image.attr("stopsrc", stillImage);
				image.addClass('playClickedGif');

				// topicDiv.append(paragraph);
				topicDiv.append(image);

				$('#gifView').append(topicDiv);

				// image.addClass('playClickedGif');
// rating display
			}
		});
	}

	function swapGif()
	{
		var playImage = $(this).attr('playsrc');
		console.log(playImage);

		var stopImage = $(this).attr('stopsrc');
		console.log(stopImage);

		if ($(this).attr('playsrc') == $(this).attr('src'))
		{
			$(this).attr('src', stopImage);
		}
		else
		{
			$(this).attr('src', playImage);
		}
	}

	// renderButtons();


	$(document).on('click', '.topicButton', displaytopicGif);
	$(document).on('click', '.playClickedGif', swapGif);

});



