let selectedText = "";

function sendDataToServer(selectedText) {
  chrome.storage.local.get(["key"], function (result) {
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
        let status = response.status;
        let data = response.data;
        if (status === 201) {
          showNotification("Đã thêm thành công!", "success", 600);
          return;
        }
        if (status === 400) {
          showNotification(data["word"][0], "error", 1500);
          return;
        }
        if (status === 401) {
          showNotification("Hãy cấu hình API key!", "warning", 2000);
          return;
        }
        if (status > 500) {
          showNotification("Server đang bị lỗi!", "error", 1500);
          return;
        }
      }
    );
  });
}

function getSelectedText() {
  let _selectedText = "";
  if (window.getSelection) {
    _selectedText = window.getSelection().toString();
  } else if (document.getSelection) {
    _selectedText = document.getSelection().toString();
  } else if (document.selection) {
    _selectedText = document.selection.createRange().text;
  } else return;
  return _selectedText;
}

function isAndroidDevice() {
  let userAgent = window.navigator.userAgent;
  let _isAndroidDevice = false;
  if (userAgent.includes("Android")) {
    _isAndroidDevice = true;
  }
  return _isAndroidDevice;
}

document.addEventListener("DOMContentLoaded", function () {
  // Create a div for the popup
  let popup = document.createElement("div");

  popup.style.visibility = "hidden";
  popup.style.fontSize = "13px";
  popup.style.position = "absolute";
  popup.style.backgroundColor = "rgb(170 205 147)";
  popup.style.margin = "0";
  popup.style.fontWeight = "600";
  popup.style.cursor = "pointer";
  popup.style.verticalAlign = "middle";
  popup.style.borderRadius = "1rem";
  popup.style.padding = "1px 3px";
  popup.style.display = "flex";
  popup.style.justifyContent = "center";
  popup.style.alignItems = "center";
  popup.style.width = "75px";
  popup.style.height = "25px";
  popup.style.border = "1px solid #99BC85";
  popup.style.color = "#344d4f";
  popup.textContent = "Save word";
  popup.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.35)";

  popup.addEventListener("mousedown", function (e) {
    sendDataToServer(selectedText);
  });

  document.body.appendChild(popup);

  // Hide the popup when we click on the screen.
  document.addEventListener(
    "mousedown",
    function (e) {
      popup.style.visibility = "hidden";
    },
    false
  );

  if (isAndroidDevice()) {
    // Event for mobile browser
    document.addEventListener("contextmenu", function (e) {
      selectedText = getSelectedText();
      if (selectedText.length > 0) {
        // Show the popup with the selected text
        popup.style.left = e.pageX - 60 + "px";
        popup.style.top = e.pageY + 33 + "px";
        popup.style.visibility = "visible";
      } else {
        popup.style.visibility = "hidden";
      }
    });
  } else {
    // Event for desktop browser
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
  }
});
