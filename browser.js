// TODO setting page. Probably do like chrome and just have normal page, open tab with iframe
// avoids having to drag in something to do modals or extra window or something.
// TODO prevent multiple opening (option?) if you click on an already opened notebook in home,
// just switches to that tab

var browser = (function(configModule, tabsModule) {
  var dce = function(str) { return document.createElement(str); };

  var Browser = function(
    controlsContainer,
    locationForm,
    locationBar,
    tabContainer,
    contentContainer,
    errorContainer
  ) {
    self = this;
    
    this.controlsContainer = controlsContainer;
    this.locationForm = locationForm;
    this.locationBar = locationBar;
    this.tabContainer = tabContainer;
    this.contentContainer = contentContainer;
    this.errorContainer = errorContainer;
    
    this.settingsButton = document.getElementById('settings-button');
    this.settingsButton.addEventListener('click', function(){
      self.openSettings();
    })

    this.tabs = new tabsModule.TabList(
        'tabs',
        this,
        tabContainer,
        contentContainer);

    this.init();
  };

  Browser.prototype.init = function() {
    this.hideAllErrors();
    (function(browser) {
      window.addEventListener('resize', function(e) {
        browser.doLayout(e);
      });

      window.addEventListener('keydown', function(e) {
        browser.doKeyDown(e);
      });
      
    chrome.storage.onChanged.addListener(function(changes, namespace) {
      for (key in changes) {
        var storageChange = changes[key];
        if (key == 'homepage') {
          self.homepage = storageChange.newValue;
          self.homepageTab.navigateTo(self.homepage);
          self.hideAllErrors();
        }
      }
    });
    

      // browser.back.addEventListener('click', function(e) {
      //   browser.tabs.getSelected().goBack();
      // });
      //
      // browser.forward.addEventListener('click', function() {
      //   browser.tabs.getSelected().goForward();
      // });

      // browser.reload.addEventListener('click', function() {
      //   var tab = browser.tabs.getSelected();
      //   if (tab.isLoading()) {
      //     tab.stopNavigation();
      //   } else {
      //     tab.doReload();
      //   }
      // });


      browser.locationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        browser.tabs.getSelected().navigateTo(browser.locationBar.value);
      });

      window.addEventListener('message', function(e) {
        if (e.data) {
          var data = JSON.parse(e.data);
          if (data.name && data.title) {
            browser.tabs.setLabelByName(data.name, data.title);
          } else {
            console.warn(
                'Warning: Expected message from guest to contain {name, title}, but got:',
                data);
          }
        } else {
          console.warn('Warning: Message from guest contains no data');
        }
      });

      var webview = dce('webview');
      var tab = browser.tabs.append(webview);

      // Global window.newWindowEvent may be injected by opener
      if (window.newWindowEvent) {
        window.newWindowEvent.window.attach(webview);
      } else {
        var homepage;
        // First window to be opened is the homepage
        chrome.storage.local.get('homepage', function(result) {
            if (result.homepage){
                homepage = result.homepage
            }
            else{
                homepage = configModule.homepage
            }
            self.homepageTab = tab;

            self.homepageTab.navigateTo(homepage);
            self.homepageTab.pin();
        
            self.homepageTab.webview.addEventListener(
                'loadabort',
                function (e) {
                    // tab.navigateTo('http://www.google.com');
                    self.showError('no-server-error');
             });
      
        });
      }
      browser.tabs.selectTab(tab);
    }(this));
  };

  Browser.prototype.openSettings = function () {
    var tab = this.tabs.append(dce('iframe'));
    tab.navigateTo('settings.html');
    tab.setLabel('Settings');
    this.tabs.selectTab(tab);
    return tab;
  }

  Browser.prototype.doLayout = function(e) {
    var controlsHeight = this.controlsContainer.offsetHeight;
    var windowWidth = document.documentElement.clientWidth;
    var windowHeight = document.documentElement.clientHeight;
    var contentWidth = windowWidth;
    var contentHeight = windowHeight - controlsHeight;

    var tab = this.tabs.getSelected();
    var webview = tab.getWebview();
    var webviewContainer = tab.getWebviewContainer();

    var layoutElements = [
      this.contentContainer,
      webviewContainer,
      webview
    ];

    for (var i = 0; i < layoutElements.length; ++i) {
      layoutElements[i].style.width = contentWidth + 'px';
      layoutElements[i].style.height = contentHeight + 'px';
    }
  };



  // New window that is NOT triggered by existing window
  Browser.prototype.doNewTab = function(e) {
    var tab = this.tabs.append(dce('webview'));
    tab.navigateTo(configModule.homepage);
    this.tabs.selectTab(tab);
    return tab;
  };

  Browser.prototype.doKeyDown = function(e) {
    if (e.ctrlKey) {
      switch(e.keyCode) {
        // Ctrl+W
        case 87:
          e.preventDefault();
          this.tabs.removeTab(this.tabs.getSelected());
          break;
      }
      // Ctrl + [1-9]
      if (e.keyCode >= 49 && e.keyCode <= 57) {
        var idx = e.keyCode - 49;
        if (idx < this.tabs.getNumTabs()) {
          this.tabs.selectIdx(idx);
        }
      }
    }
  };

  Browser.prototype.doTabNavigating = function(tab, url) {
    if (tab.selected) {
      document.body.classList.add('loading');
      this.locationBar.value = url;
    }
  };

  Browser.prototype.doTabNavigated = function(tab, url) {
    this.updateControls();
  };

  Browser.prototype.doTabSwitch = function(oldTab, newTab) {
    this.updateControls();
  };

  Browser.prototype.updateControls = function() {
    var selectedTab = this.tabs.getSelected();
    if (selectedTab.isLoading()) {
      document.body.classList.add('loading');
    }
    var selectedWebview = selectedTab.getWebview();
    if (this.locationBar.value != selectedTab.url) {
      this.locationBar.value = selectedTab.url;
    }
  };
  
  Browser.prototype.showError = function (errorName) {
    //   Should this be with classes?
    var el = document.getElementById(errorName);
    el.classList.remove('hidden');
  };
    
  Browser.prototype.hideError = function (errorName) {
    //   Should this be with classes?
    var el = this.errorContainer.getElementById(errorName);
    el.classList.add('hidden')
  };
  
  Browser.prototype.hideAllErrors = function () {
    //   Should this be with classes?
    var els = document.querySelectorAll('.error-view');
    // console.log
    for (var i = 0; i < els.length; i++) {
        var el = els[i]
        el.classList.add('hidden');
    }
  }

  return {'Browser': Browser};
})(config, tabs);
