var webviewTitleInjectionComplete = false;
(function() {
  // Prevent multiple injection
  if (!webviewTitleInjectionComplete) {
    var embedder = null;
    var tabName = null;
    var listenersAreBound = false;
    var title = null;

    var postTitle = (function() {
      return function(e) {

        title = document.title;
        var data = {
          'name': tabName,
          'title': title || '[no title]'
        };
        embedder.postMessage(JSON.stringify(data), '*');
      };
    }());

    var bindEmbedder = function(e) {
      embedder = e.source;
    };
    var bindTabName = function(e) {
      if (e.data) {
        var data = JSON.parse(e.data);
        if (data.name) {
          tabName = data.name;
        } else {
          console.warn('Warning: Message from embedder contains no tab name');
        }
      } else {
          console.warn('Warning: Message from embedder contains no data');
      }
    };

    // Wait for message that gives us a reference to the embedder
    window.addEventListener('message', function(e) {
      if (!listenersAreBound) {
        // Bind data
        bindEmbedder(e);
        bindTabName(e);

        // Notify the embedder of every title change
        var titleElement = document.querySelector('title');
        var observer = new window.MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                postTitle();
            });
        });
        observer.observe(titleElement, { subtree: true, characterData: true, childList: true });

        // Ensure initial title notification
        if (title === null) {
          postTitle();
        }

        listenersAreBound = true;

        el = document.querySelector('#header-container')
        el.style.display = 'none';
      }
    });
  }
}());
