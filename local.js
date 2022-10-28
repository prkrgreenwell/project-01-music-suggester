/** @format */

var eventDates = [
  document.getElementById("event-date1"),
  document.getElementById("event-date2"),
  document.getElementById("event-date3"),
];

var venueLocations = [
  document.getElementById("venue-loc1"),
  document.getElementById("venue-loc2"),
  document.getElementById("venue-loc3"),
];

var venueNames = [
  document.getElementById("venue-name1"),
  document.getElementById("venue-name2"),
  document.getElementById("venue-name3"),
];

var prices = [
  document.getElementById("prices1"),
  document.getElementById("prices2"),
  document.getElementById("prices3"),
];

var ticketLinks = [
  document.getElementById("ticket-link1"),
  document.getElementById("ticket-link2"),
  document.getElementById("ticket-link3"),
];

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
            var ticketPrice = event.stats.median_price;

            //Make this loopable
            var mainHeader = document.getElementById("artist-name");
            var headerImage = document.getElementById("artist-image");

            mainHeader.textContent = artistName;
            headerImage.src = artistImage;

            eventDates[i].textContent = "Date: " + eventDate;
            venueLocations[i].textContent = venueLoc;
            venueNames[i].textContent = "Venue: " + venueName;
            prices[i].textContent = "Average Price: $" + ticketPrice;
            ticketLinks[i].href = ticketLink;

            console.log(artistName);
            console.log(artistImage);
            console.log(ticketPrice);
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
