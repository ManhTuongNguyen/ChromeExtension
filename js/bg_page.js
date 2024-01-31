chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    let apiKey = request.apiKey;
    let selectedText = request.text;
    let url = "https://mtuongpk123.pythonanywhere.com/api/vocabulary/";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        word: selectedText,
      }),
    })
      .then(async (response) => {
        return {
          status: response.status,
          data: await response.json(),
        }
      })
      .then((result) => {
        sendResponse({
          status: result.status,
          data: result.data,
        });
      })
      .catch((error) => {
        sendResponse({
          status: "500",
          data: `Error: ${error}`,
        });
      });
    return true;
  }
);


// Event click on extension icon
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.create({url: 'dashboard.html'});
});

