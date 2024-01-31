document.getElementById('redirect').addEventListener('click', function() {
    chrome.tabs.create({url: 'dashboard.html'});
  });
  