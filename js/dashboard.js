function setData(data) {
  // Write data to chrome.storage
  chrome.storage.local.set({ key: data }, function () {
    showNotification("Set API key thành công!", "success");
  });
}

function getData(key, callback) {
  // Read data from chrome.storage
  chrome.storage.local.get([key], function (result) {
    let _value = result.key;
    callback(_value);
  });
}

document.getElementById("button").addEventListener("click", function() {
  let value = document.getElementById("authorization").value;
  setData(value);
});

// document ready
document.addEventListener("DOMContentLoaded", function() {
  getData("key", function(value) {
    if (!value) {
      showNotification("Hãy cấu hình API key!", "warning");
      return;
    }
    // Set value
    document.getElementById("authorization").value = value;
  });
});
