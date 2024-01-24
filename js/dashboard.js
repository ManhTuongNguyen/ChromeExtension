
function setData(data) {
    // Write data to chrome.storage
    console.log(data);
    chrome.storage.local.set({ "key": data }, function () {
        console.log('Value is set to ' + 'value');
    });
    return true;
}


function getData(key) {
    // Read data from chrome.storage
    chrome.storage.local.get([key], function (result) {
        let value = result.key;
        console.log(value);
        alert(value);
    });
}

$("#button").click(function () {
    let value = $("#authorization").val();
    setData(value);
    alert(value);
});

$("#button-2").click(function () {
    getData("key");
});
