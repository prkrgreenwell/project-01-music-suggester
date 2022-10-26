var startButton = document.getElementById("startButton");
// console.log(startButton);
var input = document.getElementById("input");
var wikiContent = document.getElementById("wikiContent");
var userInput = input.value.trim();

function getSeatGeek() {
  userInput = input.value.trim();

  var seatGeekAPI =
    "https://api.seatgeek.com/2/performers?q=" +
    userInput +
    "&client_id=Mjk5MjA1OTl8MTY2NjY2MjkxOC4yNDc4MzE4";

  fetch(seatGeekAPI)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      //   console.log(data);

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
          var eventDate = data.events[0].datetime_local;
          var venueName = data.events[0].venue.name;
          var venueLocation = data.events[0].venue.display_location;
          var ticketLink = data.events[0].url;
          var ticketPriceHigh = data.events[0].stats.highest_price;
          var ticketPriceLow = data.events[0].stats.lowest_price;

          console.log(
            artistName +
              "---" +
              artistImage +
              "---" +
              eventDate +
              "---" +
              venueName +
              "---" +
              venueLocation +
              "---" +
              ticketLink +
              "---" +
              ticketPriceHigh +
              "---" +
              ticketPriceLow
          );
        });
    })

    .catch((err) => console.error(err));
}

function getWikiAPI() {
  userInput = input.value.trim();

  var wikiAPI =
    "https:/simple.wikipedia.org/w/api.php?action=query&prop=extracts&exsentences-2&titles=" +
    userInput +
    "&explaintext=1&format=json&formatversion=2&origin=*";

  console.log(wikiAPI);
  fetch(wikiAPI)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));

  wikiContent.textContent = "blank for now";
}

startButton.addEventListener("click", function (event) {
  event.preventDefault();

  //   window.location.assign("./mainindex.html");

  getSeatGeek();
});
