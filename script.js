var searchBtn = document.getElementById('searchBtn');
var artist = document.getElementById('artist');
var wikiContent = document.getElementById('wikiContent');
var userInput = artist.value.trim();

function getSeatGeek() {

	userInput = artist.value.trim();

	var seatGeekAPI = 'https://api.seatgeek.com/2/performers?q=' + userInput + '&client_id=Mjk5MjA1OTl8MTY2NjY2MjkxOC4yNDc4MzE4'

	console.log(seatGeekAPI);
	fetch(seatGeekAPI)
		.then(response => response.json())
		.then(response => console.log(response))
		.catch(err => console.error(err));
};

function getWikiAPI() {

	userInput = artist.value.trim();

	var wikiAPI = 'https:/simple.wikipedia.org/w/api.php?action=query&prop=extracts&exsentences-2&titles=' + userInput + '&explaintext=1&format=json&formatversion=2&origin=*'

	console.log(wikiAPI);
	fetch(wikiAPI)
		.then(response => response.json())
		.then(response => console.log(response))
		.catch(err => console.error(err));

		wikiContent.textContent = 'blank for now'
};

searchBtn.addEventListener('click',() => {
	getSeatGeek();
	getWikiAPI();
});