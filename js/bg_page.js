chrome.runtime.onMessage.addListener(
  async (request, sender, handleResponse) => {
    let apiKey = request.apiKey;
    let selectedText = request.text;
    let url = "https://mtuongpk123.pythonanywhere.com/api/vocabulary/";
    try {
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
        .then((response) => {
          let status = response.status;
          if (status >= 200 && status < 300) {
            return response.json();
          }
          else {
            handleResponse({
              status: "error",
              message: `Error: ${response}`,
            })
          }
        })
        .then((responseJson) => {
          handleResponse({
            status: "success",
            message: responseJson,
          });
        })
        .catch((error) => {
          handleResponse({
            status: "error",
            message: `Error: ${error}`,
          });
        });
    } catch (error) {
      handleResponse({
        status: "error",
        message: `Error: ${error}`,
      });
    }
  }
);
