$(document).ready(function(){

  let app_id="510";
  //on Click Listeners
    $("#searchButton").click(function(){
      //extract search text
      var artistInput = $("#searchText").val().trim();
      getArtists(artistInput, app_id);
      $("#searchText").val("");
    });

    //on- set on click for artist card that will be generated dynamically in the future
    $(".artist").on("click",".artistCard",function(){
      var artist = $(".artistName").html();
        updateUIEventPage();
        getEvents(artist,app_id);
    });

    //Move back from event search results
    $("#back").click(function(){
      updateUISearchPage();
    });
  
  });

  function getArtists(artistName,app_id) {
    let queryArtist = 'https://rest.bandsintown.com/artists/' + artistName + '?app_id='+app_id;
    // Run API to get the artist
    $.ajax({
      url: queryArtist,
      method: "GET",
      success:function(response) {
        $(".artist").empty();
        // $.each(response, function(i,data) {
              $("#numberOfArtist").html(response.length);
              card=$("<div  class=\"artistCard card column col-xl-3 col-lg-4 col-md-5 col-sm-8  col-8\">");
              cardBody=$(" <div class=\"card-body text-center\">");
              cardBody.append( "<img src="+response.image_url+ " class=\"rounded-circle mr-3 profileImage \" alt=\"Profile Picture\"></img>");
              cardBody.append("<h5 class=\"artistName\">"+response.name+"</h5>");
              cardBody.append("<p class=\"url\">"+response.facebook_page_url+"</p>");
              card.append(cardBody);
              
              $(".artist").append(card);
          
          // });
      }
    });
  }

  function getEvents(artistName,app_id){
    let queryEvent  = 'https://rest.bandsintown.com/artists/' + artistName + '/events?app_id='+app_id;

      // run API to get the events
      $.ajax({
        url: queryEvent,
        method: "GET",
        error:function(xhr, textStatus, errorThrown){
          // $(".js-no-artist").show();
          // $(".js-artist-info").hide();
          },
        success:function(response) {
            $(".event").empty();
            // Loop through results
            $.each(response, function(i,data) {

                card=$("<div class=\"card column col-xl-3 col-lg-4 col-md-5 col-sm-8  col-11\">");
                  table=$("<table class=\"table table-borderless\">");

                  title=$("<tr class=\"bordered\">");
                  title.append("<th colspan=\"2\" class='th'> EVENT DETAILS</th>" );
                  table.append(title);
                  // County and City 
                  heading = $("<tr>");
                  heading.append("<th class='th'>Country</th>" );
                  heading.append("<th class='th'>City</th>" );

                  table.append(heading);

                  row=$("<tr>");
                  row.append("<td class='td'>" + data.venue.country +"</td>" );
                  row.append("<td class='td'>" + data.venue.city );

                  table.append(row);

                  //Venue and date 
                  heading = $("<tr>");
                  heading.append("<th class='th'>" + "Venue" +"</th>" );
                  heading.append("<th class='th'>" + "Date" +"</th>" );
                  table.append(heading);


                  row=$("<tr>");
                  row.append("<td class='td'>" + data.venue.name +"</td>" );
                  row.append("<td class='td'>" + data.datetime );
                  table.append(row);
                card.append(table);
                $(".event").append(card);
            });
        }
      });
     
    }
    //Event page UI
    function updateUIEventPage(){
      $("#searchBar").hide();
      $("#back").show();
      $("#eventPage").show();
    }
    //Search Page UI
    function updateUISearchPage(){
      $("#searchBar").show();
      $("#back").hide();
      $("#eventPage").hide();
    }
