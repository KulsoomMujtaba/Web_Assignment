$(document).ready(function(){

    $("#searchButton").click(function(){
      var artistInput = $("#searchText").val().trim();
      getArtists("maroon5");
      // getEvents("maroon5");
      // alert(" input: "+artistInput);
      // getArtists(artistInput);
      // getEvents(artistInput);
    });

    //on- set on click for artist card that will be generated dynamically 
    $("#profile").on("click",".artistCard",function(){
      var artist = $("#artistName").html();
        changeUI();
        getEvents(artist);
    });
  
  });

  function getArtists(artistName) {
    //  alert(" in func : helooo"+ artistName);
    let queryArtist = 'https://rest.bandsintown.com/artists/' + artistName + '?app_id=codingbootcamp';
          // alert(" in func : "+ queryArtist);

    // Run API to get the artist
    $.ajax({
      url: queryArtist,
      method: "GET",
      success:function(response) {
        // if(response){       
        //   alert( (response + '').length );
        // }
        $(".artist").empty();
        console.log("image url: ");
        // $("#artistSearchResults").text().replace("-1", "1");
        // $.each(response, function(data) {
            // console.log("image url: "+response[i].image_url);
              $("#numberOfArtist").html(response.length);
              card=$("<div  class=\"artistCard card column col-xl-3 col-lg-4 col-md-5 col-sm-8  col-8\">");
              cardBody=$(" <div class=\"card-body text-center\">");
              cardBody.append( "<img src="+response.image_url+ " class=\"rounded-circle mr-3\" height=\"70px\" width=\"70px\" alt=\"Profile Picture\"></img>");
              cardBody.append("<h5 id=\"artistName\">"+response.name+"</h5>");
              cardBody.append("<p>"+response.facebook_page_url+"</p>");
              card.append(cardBody);
              
              $(".artist").append(card);
          
          // });
      }
    });
  }

  function getEvents(artistName){
    let queryEvent  = 'https://rest.bandsintown.com/artists/' + artistName + '/events?app_id=codingbootcamp';

      // run API to get the events
      $.ajax({
        url: queryEvent,
        method: "GET",
        error:function(xhr, textStatus, errorThrown){
          $(".js-no-artist").show();
          $(".js-artist-info").hide();
          },
        success:function(response) {

          $(".js-no-artist").hide();
          $(".js-artist-info").show();
    
          if (!response.length) {
            $(".js-no-events").show();
            $(".js-event-table").hide();
          } else {
            $(".js-event-table").show();
            $(".js-no-events").hide();
            $(".event").empty();
            // Loop through results
            $.each(response, function(i, data) {
              if (i < 10) {

                card=$("<div class=\"card column col-xl-3 col-lg-4 col-md-5 col-sm-8  col-11\">");
                  table=$("<table class=\"table table-borderless\">");

                  title=$("<tr class=\"bordered\">");
                  title.append("<th colspan=\"2\" class='th'> EVENT DETAILS</th>" );
                  table.append(title);
                  // County and City 
                  heading = $("<tr>");
                  // event.append("<td class='td'>" + moment(data.datetime).format('MM/DD/YY') + "</td>" );
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
              }
            });
          }
        }
      });
     
    }
    function changeUI(){
      $("#searchBar").hide();
    }
