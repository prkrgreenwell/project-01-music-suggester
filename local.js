function getstorageInput() {
  var storedInput = localStorage.getItem("search");

  if (storedInput !== null) {
    userInput = storedInput;
  }
  getSeatGeek(storedInput);
}
function getSeatGeek(Artist) {
  var seatGeekAPI =
    "https://api.seatgeek.com/2/performers?q=" +
    Artist +
    "&client_id=Mjk5MjA1OTl8MTY2NjY2MjkxOC4yNDc4MzE4";

  fetch(seatGeekAPI)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);

      var artistID = data.performers[0].id;

      var eventsAPI =
        "https://api.seatgeek.com/2/events?performers.id=" +
        artistID +
        "&client_id=Mjk5MjA1OTl8MTY2NjY2MjkxOC4yNDc4MzE4";

      fetch(eventsAPI)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          var artistName = data.events[0].performers[0].name;
          var artistImage = data.events[0].performers[0].image;

          for (var i = 0; i < 3; i++) {
            var event = data.events[i];
            var venueLoc = event.venue.display_location;
            var eventDate = event.datetime_local;
            var venueName = event.venue.name;
            var ticketLink = event.url;
            var ticketPriceHigh = event.stats.highest_price;
            var ticketPriceLow = event.stats.lowest_price;
            console.log(artistName);
            console.log(artistImage);
            console.log(ticketPriceLow);
            console.log(ticketPriceHigh);
            console.log(ticketLink);
            console.log(venueName);
            console.log(eventDate);
            console.log(venueLoc);
          }
        });
    })

    .catch((err) => console.error(err));
}
getstorageInput();
