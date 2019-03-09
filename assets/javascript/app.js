$(document).ready(function() {

var topics = ["Archery", "Baseball", "Basketball", "Boxing", "Hockey", "Football", "Golf", "Softball", "Soccer", "Swimming"];

function renderButtons() {
  
  $("#buttonSports").empty();
  
  for (var i = 0; i < topics.length; i++) {
  
    var array = $("<button>");
    
    array.addClass("btn btn - sports info");
    
    array.attr("data-name", topics[i]);
    
    array.text(topics[i]);
    
    $("#buttonSports").append(array);
    $('#sports-input').val('')
  }
}

$("#add-sports").on("click", function(event) {
  
  event.preventDefault();
  
  var sports = $("#sports-input").val().trim();
  
  topics.push(sports);

  renderButtons();
});

$(document).on("click", ".sports", showGifs);

renderButtons()

});


function showGifs() {
    var sports = $(this).attr('data-name');
    var queryGiphy = "https://api.giphy.com/v1/gifs/search?q=" + sports + "&limit=15&api_key=JDXE1o5ao1qG0HTYvTSdvg6yx2EzNGLG";       
    
    $("#gifRowOne").empty();
    $("#gifRowTwo").empty();
    $("#gifRowThree").empty();
           
    $.ajax({
    url: queryGiphy,
    method: "GET"
    }).done(function(response) {
       
      var giphyArray = response.data; 
    
      for(i=0; i<giphyArray.length; i++){
        
        var sportsGifs = $('<div class="col-sm-9">');
        var paragraphOne = $("<p>").text("Rating: " + giphyArray[i].rating);
        var sportsImage = $('<img data-state="still">')

        sportsImage.attr('src', giphyArray[i].images.fixed_height_still.url)
        sportsImage.attr('data-animate', giphyArray[i].images.fixed_height.url)
        sportsImage.attr('data-still', giphyArray[i].images.fixed_height_still.url)
        sportsImage.attr('class', 'gif img-responsive')
        
        sportsGifs.append(sportsImage);
        sportsGifs.append(paragraphOne);
        //Get gifs to fit on page properly
        if (i < 5){
          $('#gifRowOne').append(sportsGifs)
        }
        else if (i > 6 && i < 10) { 
          $('#gifRowTwo').append(sportsGifs)
        }
        else if (i > 11 && i < 15) { 
          $('#gifRowThree').append(sportsGifs)
        }
      };
    })
}

$(document).on("click", ".gif", function(){

  var still = $(this).attr("data-still");
  var animate = $(this).attr("data-animate");

  if ($(this).attr("data-state") === "still"){
    $(this).attr("src", animate);
    $(this).attr("data-state", "animate");  
  }
  else {
    $(this).attr("src", still);
    $(this).attr("data-state", "still");
  }
})

