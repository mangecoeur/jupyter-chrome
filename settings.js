var settings = (function(configModule) {

  var Settings = function(
    editSettingsForm,
  ) {
    this.editSettingsForm = editSettingsForm;
    self = this;

    this.editSettingsForm.addEventListener('submit', function(e){
        e.preventDefault();
    })

  }
