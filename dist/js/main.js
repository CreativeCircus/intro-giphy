"use strict";

/**
 * Fetches GIFs from the Giphy API
 *
 * @param {String} searchTerm what you want to search giphy for
 * @param {Function} callback the function to call when giphy replies with some gifs
 */
var getGif = function getGif(searchTerm, callback) {
  // learn about how the giphy API wants you to construct your URLs to make a request here:
  // https://developers.giphy.com/docs/api/endpoint#search
  var GIPHY_API = 'https://api.giphy.com/v1/gifs/search?api_key=' + GIPHY_API_KEY + '&rating=G&offset=' + Math.floor(Math.random() * 10) + '&'; // axios is a package for fetching data via ajax.

  axios.get(GIPHY_API + 'q=' + searchTerm).then(function (response) {
    callback(response.data.data);
  }).catch(function (error) {
    console.warn(error);
  });
};
/*
 * simple example of how to get cat gifs and console log the results
 */
// getGif('cat', function(gifData) {
// 	console.log(gifData)
// })


var fade = 3;
var giphyIndex = 0;
var giphyData = null;
var $field = document.querySelector('.search-field');
var $background = document.querySelector('.background');
var $foreground = document.querySelector('.foreground');
setInterval(function () {
  fade -= 0.025;
  if (fade < 0.1) fade = 0.1;
  $field.style.opacity = fade;
}, 33);
$field.addEventListener('mousemove', function () {
  fade = 3;
});
$field.addEventListener('click', function () {
  fade = 3;
});
$field.addEventListener('keyup', function () {
  fade = 3;

  if ($field.value.length > 0) {
    doSearch();
  } else {
    $background.style.backgroundImage = "";
    $foreground.style.backgroundImage = "";
  }
});

var doSearch = function doSearch() {
  getGif($field.value, handleGiphyResponse);
};

var handleGiphyResponse = function handleGiphyResponse(gifData) {
  // console.log('got data', gifData)
  giphyIndex = 0;
  giphyData = gifData;
  updateGifView();
};

var updateGifView = function updateGifView() {
  // console.log('foo')
  $background.style.backgroundImage = "url(".concat(giphyData[giphyIndex].images.original.url, ")");
  $foreground.style.backgroundImage = "url(".concat(giphyData[giphyIndex].images.original.url, ")");
};

window.addEventListener('keyup', function (event) {
  console.log(event.code);

  if (event.code === "ArrowLeft") {
    giphyIndex--;
    if (giphyIndex < 0) giphyIndex = 0;
    updateGifView();
  } else if (event.code === "ArrowRight") {
    giphyIndex++;
    if (giphyIndex >= giphyData.length) giphyIndex = giphyData.length - 1;
    updateGifView();
  }
});
$field.focus();
setTimeout(function () {
  $field.value = 'c';
  doSearch();
  fade = 3;
}, 2000);
setTimeout(function () {
  $field.value = 'ca';
  doSearch();
  fade = 3;
}, 2500);
setTimeout(function () {
  $field.value = 'cat';
  doSearch();
  fade = 3;
}, 3000);
//# sourceMappingURL=main.js.map
