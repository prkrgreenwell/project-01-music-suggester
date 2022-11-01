/** @format */
var storedInput;

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

function formatDate(date) {
  var newDate = date.split("-");
  var yearNum = String(newDate[0]);
  var monthNum = Number(newDate[1]);
  var dayNum = String(newDate[2].slice(0, 2));
  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  var month = months[monthNum - 1];

  var finalDate = month + " " + dayNum + ", " + yearNum;

  return finalDate;
}

function getstorageInput() {
  storedInput = localStorage.getItem("search");

  if (storedInput !== null) {
    userInput = storedInput;
  }
  getSeatGeek(storedInput);
  getWikiAPI(storedInput);
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
          console.log(data.events.length);

          if (data.events.length === 0) {
            var removeInfo = document.getElementById("section");
            var mainHeader = document.getElementById("artist-name");
            var hideButtons = document.getElementById("hide-buttons");

            removeInfo.style.display = "none";
            hideButtons.innerHTML = "";

            mainHeader.textContent = "No upcoming dates for this artist";
          }

          var artistName = data.events[0].performers[0].name;
          var artistImage = data.events[0].performers[0].image;

          if (data.events.length === 1) {
            document.getElementById("container2").style.display = "none";
            document.getElementById("container3").style.display = "none";

            for (var i = 0; i < 1; i++) {
              var event = data.events[i];
              var venueLoc = event.venue.display_location;
              var eventDate = event.datetime_local;
              var venueName = event.venue.name;
              var ticketLink = event.url;
              var ticketPrice = event.stats.median_price;

              var mainHeader = document.getElementById("artist-name");
              var headerImage = document.getElementById("artist-image");

              mainHeader.textContent = artistName;
              headerImage.src = artistImage;

              eventDates[i].textContent = "Date: " + eventDate;
              venueLocations[i].textContent = venueLoc;
              venueNames[i].textContent = "Venue: " + venueName;
              prices[i].textContent = "Average Price: $" + ticketPrice;
              ticketLinks[i].href = ticketLink;
            }
          }

          if (data.events.length === 2) {
            document.getElementById("container3").style.display = "none";

            for (var i = 0; i < 3; i++) {
              var event = data.events[i];
              var venueLoc = event.venue.display_location;
              var eventDate = event.datetime_local;
              var venueName = event.venue.name;
              var ticketLink = event.url;
              var ticketPrice = event.stats.median_price;

              var mainHeader = document.getElementById("artist-name");
              var headerImage = document.getElementById("artist-image");

              mainHeader.textContent = artistName;
              headerImage.src = artistImage;

              eventDates[i].textContent = "Date: " + eventDate;
              venueLocations[i].textContent = venueLoc;
              venueNames[i].textContent = "Venue: " + venueName;
              prices[i].textContent = "Average Price: $" + ticketPrice;
              ticketLinks[i].href = ticketLink;
            }
          }

          if (data.events.length >= 3) {
            for (var i = 0; i < 3; i++) {
              var event = data.events[i];
              var venueLoc = event.venue.display_location;
              var eventDate = event.datetime_local;
              var venueName = event.venue.name;
              var ticketLink = event.url;
              var ticketPrice = event.stats.median_price;

              var mainHeader = document.getElementById("artist-name");
              var headerImage = document.getElementById("artist-image");

              mainHeader.textContent = artistName;
              headerImage.src = artistImage;

              eventDates[i].textContent = "Date: " + eventDate;
              venueLocations[i].textContent = venueLoc;
              venueNames[i].textContent = "Venue: " + venueName;
              prices[i].textContent = "Average Price: $" + ticketPrice;
              ticketLinks[i].href = ticketLink;
            }
          }

          console.log(artistName);
          console.log(artistImage);
          console.log(ticketPrice);
          console.log(ticketLink);
          console.log(venueName);
          console.log(eventDate);
          console.log(venueLoc);
        });
    })

    .catch((err) => console.error(err));
}

function getWikiAPI(info) {
  //   var wikiAPI =
  //     "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exsentences=5&explaintext&titles=Dogs&format=json&formatversion=2&origin=*";
  var wikiAPI =
    "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=" +
    info.replace(/['"]+/g, "") +
    "&origin=*";

  console.log(wikiAPI);

  fetch(wikiAPI)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      var pageValue;
      for (var property in data.query.pages) {
        pageValue = property;
      }
      console.log(data.query.pages[pageValue]);
      var artistInfo = data.query.pages[pageValue].extract;
      console.log(artistInfo);
    })

    .catch((err) => console.error(err));
}
getstorageInput();
