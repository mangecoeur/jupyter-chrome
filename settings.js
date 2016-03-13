var settings = (function(configModule) {
  var Settings = function(editSettingsForm) {
    self = this;

    self.editSettingsForm = editSettingsForm;
    self.jupyer_home_input = self.editSettingsForm.querySelector('#jupyter_homepage')
    
    chrome.storage.local.get('homepage', function(result) {
          if (result.homepage){
            self.homepage = result.homepage
          }
          else {
              self.homepage = configModule.homepage
          }
          self.jupyer_home_input.value = self.homepage
    });
          
    self.editSettingsForm.addEventListener('submit', function(e){
        e.preventDefault();
        self.homepage = self.jupyer_home_input.value
        chrome.storage.local.set({'homepage': self.homepage});
        // localStorage.setItem('homepage', self.homepage);
    });
    
  }
  return {'Settings': Settings};  
})(config);
