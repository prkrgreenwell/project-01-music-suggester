var spotifyAPIKey = '49898744b0msh96345f1aa45b56dp11709fjsnd5d665180416'

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '49898744b0msh96345f1aa45b56dp11709fjsnd5d665180416',
		'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
	}
};

fetch('https://spotify23.p.rapidapi.com/search/?q=%3CREQUIRED%3E&type=multi&offset=0&limit=10&numberOfTopResults=5', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));

    