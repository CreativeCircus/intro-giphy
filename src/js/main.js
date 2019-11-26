/**
 * Fetches GIFs from the Giphy API
 *
 * @param {String} searchTerm what you want to search giphy for
 * @param {Function} callback the function to call when giphy replies with some gifs
 */
let getGif = function(searchTerm, callback) {
	// learn about how the giphy API wants you to construct your URLs to make a request here:
	// https://developers.giphy.com/docs/api/endpoint#search
	const GIPHY_API = 'https://api.giphy.com/v1/gifs/search?api_key=' + GIPHY_API_KEY + '&rating=G&';
	
	// axios is a package for fetching data via ajax.
	axios.get(GIPHY_API + 'q=' + searchTerm)
		.then(function(response) {
			callback(response.data.data)
		})
		.catch(function (error) {
			console.warn(error);
		})
}



/*
 * simple example of how to get cat gifs and console log the results
 */
getGif('cat', function(gifData) {
	console.log(gifData)
})