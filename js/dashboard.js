function setData(data) {
  // Write data to chrome.storage
  chrome.storage.local.set({ key: data }, function () {
    showNotification("Set API key thành công!", "success");
  });
  getSavedWord(value);
}

function getData(key, callback) {
  // Read data from chrome.storage
  chrome.storage.local.get([key], function (result) {
    let _value = result.key;
    callback(_value);
  });
}

document.getElementById("btn-save-key").addEventListener("click", function () {
  let value = document.getElementById("authorization").value;
  setData(value);
});

function getSavedWord(value) {
  fetch("https://mtuongpk123.pythonanywhere.com/api/vocabulary/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${value}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.total_object === 0) {
        document.getElementById("info_text").innerHTML =
          "You have not saved any word!";
      } else {
        document.getElementById(
          "info_text"
        ).innerHTML = `You have ${data?.total_object} saved word!`;
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

// document ready
document.addEventListener("DOMContentLoaded", function () {
  getData("key", function (value) {
    if (!value) {
      showNotification("Hãy cấu hình API key!", "warning");
      return;
    }
    document.getElementById("authorization").value = value;
    getSavedWord(value);
  });
});

document
  .getElementById("btn-download-word")
  .addEventListener("click", function () {
    let fileUrl =
      "https://mtuongpk123.pythonanywhere.com/api/vocabulary/download-workbook/";
    getData("key", (apiKey) => {
      if (!apiKey) {
        showNotification("Hãy cấu hình API key!", "warning");
        return;
      }
      fetch(fileUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      })
        .then((response) => {
          let contentDisposition = response.headers.get("Content-Disposition");
          let filename = contentDisposition.match(
            /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
          )[1];
          return response.blob().then((blob) => ({ blob, filename }));
        })
        .then(({ blob, filename }) => {
          let url = window.URL.createObjectURL(blob);
          let a = document.createElement("a");
          a.href = url;
          a.download = filename;
          document.body.appendChild(a);
          a.click();
          a.remove();
        })
        .catch((e) => showNotification(e));
    });
  });

document
  .getElementById("btn-update-word")
  .addEventListener("click", function () {
    getData("key", (value) => {
      if (!value) {
        showNotification("Hãy cấu hình API key!", "warning");
        return;
      }
      fetch("https://mtuongpk123.pythonanywhere.com/api/vocabulary/update-translation/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${value}`,
        },
      })
        .then((response) => {
          if (response.status === 200) {
            showNotification("Đã cập nhật thành công!", "success");
          }
          else {
            showNotification("Có lỗi xảy ra!", "warning");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    });
  });
