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

$("#button").click(function () {
  let value = $("#authorization").val();
  setData(value);
});

$("#button-2").click(function () {
  getData("key");
});

// document ready
$(document).ready(function () {
  getData("key", function (value) {
    if (!value) {
      showNotification("Hãy cấu hình API key!", "warning");
      return;
    }
    // Set value
    $("#authorization").val(value);
  });
});
