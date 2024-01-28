let selectedText = "";

function sendDataToServer(selectedText) {
  chrome.storage.local.get(["key"], async function (result) {
    let value = result.key;
    if (!value) {
      showNotification("Hãy cấu hình API key!", "warning", 3000);
      return;
    }

    if (!selectedText) {
      showNotification("Hãy chọn từ cần thêm!", "warning");
      return;
    }

    chrome.runtime.sendMessage(
      { apiKey: value, text: selectedText },
      function (response) {
        console.log(response);
      }
    );
  });
}

document.addEventListener("DOMContentLoaded", function () {
  // Create a div for the popup
  let popup = document.createElement("div");

  popup.style.visibility = "hidden";
  popup.style.fontSize = "14px";
  popup.style.position = "absolute";
  popup.style.backgroundColor = "#BFD8AF";
  popup.style.margin = "0";
  popup.style.fontWeight = "600";
  popup.style.cursor = "pointer";
  popup.style.verticalAlign = "middle";
  popup.style.borderRadius = "1rem";
  popup.style.padding = ".1rem .5rem";
  popup.style.display = "flex";
  popup.style.justifyContent = "center";
  popup.style.alignItems = "center";
  popup.style.width = "70px";
  popup.style.height = "25px";
  popup.style.border = "1px solid #99BC85";
  popup.style.color = "#fff";
  popup.textContent = "Click here";
  popup.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.35)";

  popup.addEventListener("mousedown", function (e) {
    sendDataToServer(selectedText);
  });

  document.body.appendChild(popup);

  // Listen for mouseup events
  document.addEventListener(
    "mouseup",
    function (e) {
      selectedText = window.getSelection().toString();
      if (selectedText.length > 0) {
        // Show the popup with the selected text
        popup.style.left = e.pageX - 120 + "px";
        popup.style.top = e.pageY + 15 + "px";
        popup.style.visibility = "visible";
      }
    },
    false
  );

  // Hide the popup when we click on the screen.
  document.addEventListener(
    "mousedown",
    function (e) {
      popup.style.visibility = "hidden";
    },
    false
  );
});
