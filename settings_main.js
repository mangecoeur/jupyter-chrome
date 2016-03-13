var settingsMain = null;

(function(settingsModule) {
  var query = function(str) { return document.querySelector(str); };
  window.addEventListener('load', function(e) {
    settingsMain = new settingsModule.Settings(query('#edit-settings'));
  });
})(settings);
