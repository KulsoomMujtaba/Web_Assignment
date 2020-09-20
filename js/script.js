$(document).ready(function(){

    $(".searchButton").click(function(){
      var artistInput = $("#search").val().trim();
      // getArtists("maroon5");
      // getEvents("maroon5");
      // alert(" input: "+artistInput);
      getArtists(artistInput);
      // getEvents(artistInput);
    });
  
  });

    function getArtists(artistName) {
      // alert(" in func : helooo"+ artistName);
      let queryArtist = 'https://rest.bandsintown.com/artists/' + artistName + '?app_id=codingbootcamp';
            // alert(" in func : "+artistName);

      // run bandsintown API to get the info
      $.ajax({
        url: queryArtist,
        method: "GET",
        success:function(response) {
                // alert(" input: "+artistName);

          $('.js-artist-name').html(response.name);
          $('.js-artist-image').attr('src', response.image_url);
          $('.js-artist-url').html(response.facebook_page_url);
          
        }
      });
    }

    function getEvents(artistName){
      let queryEvent  = 'https://rest.bandsintown.com/artists/' + artistName + '/events?app_id=codingbootcamp';

        // run bandsintown API to get the events
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
                if (i <= 10) {

                  card=$("<div class=\"card column col-xl-3 col-lg-4 col-md-5 col-sm-8  col-8\">");

                    table=$("<table class=\"table table-borderless\">");
                    // County and City 
                    heading = $("<tr>");
                    // alert(data.venue.name+ " i: "+i);
                    // event.append("<td class='td'>" + moment(data.datetime).format('MM/DD/YY') + "</td>" );
                    heading.append("<th class='th'>" + "Country" +"</th>" );
                    heading.append("<th class='th'>" + "City" +"</th>" );

                    table.append(heading);
                    // $(".event").append(heading);

                    row=$("<tr>");
                    row.append("<td class='td'>" + data.venue.country +"</td>" );
                    row.append("<td class='td'>" + data.venue.city );
                    // $(".event").append(row);

                    table.append(row);

                    //Venue and date 
                    heading = $("<tr>");
                    heading.append("<th class='th'>" + "Venue" +"</th>" );
                    heading.append("<th class='th'>" + "Date" +"</th>" );
                    // $(".event").append(heading);
                    table.append(heading);


                    row=$("<tr>");
                    row.append("<td class='td'>" + data.venue.name +"</td>" );
                    row.append("<td class='td'>" + data.datetime );
                    table.append(row);
                  card.append(table);
                  $(".event").append(card);


                  // event.append('<td><a href="'+ data.offers[0].url+'" target="_blank" class="btn btn-sm btn-primary btn-block">Tickets</a></td>');
                }
              });
            }
          }
        });
    }
