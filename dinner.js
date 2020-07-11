
function getMunchies(dinner) {
    

    const queryURL = "https://developers.zomato.com/api/v2.1/search?entity_id=280&entity_type=city&q=" +
        dinner + "&count=6&sort=rating&apikey=b12fbdce2dfa854d91ec1e69686e185c"

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            console.log(queryURL);
            console.log(response);

            const results = response.restaurants
            console.log(results);

            for (let i = 0; i < results.length; i++) {
                const RestInfoCard = $('<div class = "Rest-Info uk-card uk-card-default" ></div>');
                
                const RestInfoDiv = $('<div class = "Rest-Info uk-card-body" ></div>');
                
                const RESTname = results[i].restaurant.name;
                const pONE = $("<p class = 'uk-card-title'>").text("Name: " + RESTname)
                
                RestInfoDiv.append(pONE);

                const RESTaddress = results[i].restaurant.location.address;
                const pTWO = $("<p>").text("Address: " + RESTaddress);
                RestInfoDiv.append(pTWO);

                const RESTratings = results[i].restaurant.user_rating.aggregate_rating;
                const RESTreviewnumber = results[i].restaurant.all_reviews_count;
                const pTHREE = $("<p>").text("Ratings: " + RESTratings + " ; " + " No. of reviews: " + RESTreviewnumber);
                RestInfoDiv.append(pTHREE);

                const RESTwebsite = results[i].restaurant.url;
                RestInfoCard.append(RestInfoDiv);

                const RestInfoimage = $(`<a href = ${RESTwebsite} class = "Rest-Info-Image uk-card-media-bottom" ></a>`);
                const RESTpics = results[i].restaurant.featured_image;
                const pFIVE = $("<img>").attr("src", RESTpics);

                RestInfoimage.append(pFIVE);
                RestInfoCard.append(RestInfoimage);

                $(".container1").append(RestInfoCard);
            }       
        });
};

$("#SearchBtn").on("click", function (event) {
    event.preventDefault();

    const dinnerInput = $("#Search-Term").val().trim();

    getMunchies(dinnerInput);
    $(".Rest-Info").empty();
   
});

$("#Search-Term").keypress(function(e){
    if(e.which == 13){
        $("#SearchBtn").click();
    }
});
