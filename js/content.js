
function sendDataToServer() {
    chrome.storage.local.get(["key"], async function (result) {
        // let value = result.key;
        const response = await fetch('https://653a0546e3b530c8d9e8f8f4.mockapi.io/api/student/1/');
        const data = await response.json();
        let avatar = data.avatar;
        alert(avatar);
    });
}


document.addEventListener('DOMContentLoaded', function () {
    // Create a div for the popup
    let popup = document.createElement('div');

    popup.style.visibility = 'hidden';
    popup.style.position = 'absolute';
    popup.style.backgroundColor = '#AAD9BB';
    popup.style.margin = '0';
    popup.style.fontWeight = '600';
    popup.style.cursor = 'pointer';
    popup.style.verticalAlign = 'middle';
    popup.style.borderRadius = '1rem';
    popup.style.padding = ".1rem .5rem";
    popup.style.display = 'flex';
    popup.style.justifyContent = 'center';
    popup.style.alignItems = 'center';
    popup.style.width = '80px';
    popup.style.height = '30px';
    popup.style.border = '1px solid #a3bfb1';
    popup.style.color = '#fff';
    popup.textContent = "Click here";
    popup.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.35)";

    popup.addEventListener('mousedown', function (e) {
        sendDataToServer();
    });

    document.body.appendChild(popup);

    // Listen for mouseup events
    document.addEventListener('mouseup', function (e) {
        var selectedText = window.getSelection().toString();
        if (selectedText.length > 0) {
            // Show the popup with the selected text
            popup.style.left = e.pageX - 120 + 'px';
            popup.style.top = e.pageY + 15 + 'px';
            popup.style.visibility = 'visible';


        }
    }, false);

    // Hide the popup when we click on the screen.
    document.addEventListener('mousedown', function (e) {
        popup.style.visibility = 'hidden';
    }, false);
});
