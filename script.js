var startButton = document.getElementById('startButton');
console.log(startButton);
var input = document.getElementById('input');
var wikiContent = document.getElementById('wikiContent');
var userInput = input.value.trim();

function getSeatGeek() {

	userInput = input.value.trim();

	var seatGeekAPI = 	'https://api.seatgeek.com/2/events?q=' + userInput + '&client_id=Mjk5MjA1OTl8MTY2NjY2MjkxOC4yNDc4MzE4';

	console.log(seatGeekAPI);
	fetch(seatGeekAPI)
		.then(response => response.json())
		.then(response => console.log(response))
		.catch(err => console.error(err));
};

function getWikiAPI() {

	userInput = input.value.trim();

	var wikiAPI = 'https:/simple.wikipedia.org/w/api.php?action=query&prop=extracts&exsentences-2&titles=' + userInput + '&explaintext=1&format=json&formatversion=2&origin=*';

	console.log(wikiAPI);
	fetch(wikiAPI)
		.then(response => response.json())
		.then(response => console.log(response))
		.catch(err => console.error(err));

		wikiContent.textContent = 'blank for now'
};

startButton.addEventListener('click', function(event) {
	event.preventDefault();

	getSeatGeek();
});