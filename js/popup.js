document.getElementById('redirect').addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(activeTabs) {
      chrome.tabs.update(activeTabs[0].id, {url: 'dashboard.html'});
    });
  });
  