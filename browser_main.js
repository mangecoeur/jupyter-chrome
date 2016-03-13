var mainBrowser = null;
(function(browserModule) {
  var query = function(str) { return document.querySelector(str); };


  window.addEventListener('load', function(e) {
    mainBrowser = new browserModule.Browser(
        query('#controls'),
        query('#location-form'),
        query('#location'),
        query('#tab-container'),
        query('#content-container'),
        query('#error-container')

      );
  });
})(browser);
