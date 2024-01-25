
function sendDataToServer(selectedText) {
    chrome.storage.local.get(["key"], async function (result) {
        let value = result.key;
        // const response = await fetch('https://653a0546e3b530c8d9e8f8f4.mockapi.io/api/student/1/');
        // const data = await response.json();
        // let avatar = data.avatar;
        // alert(avatar);
        showNotification(selectedText + ' ' + value, type='success');
    });
}

let selectedText = '';


document.addEventListener('DOMContentLoaded', function () {
    // Create a div for the popup
    let popup = document.createElement('div');

    popup.style.visibility = 'hidden';
    popup.style.fontSize = '14px';
    popup.style.color = '#F3B95F';
    popup.style.position = 'absolute';
    popup.style.backgroundColor = '#BFD8AF';
    popup.style.margin = '0';
    popup.style.fontWeight = '600';
    popup.style.cursor = 'pointer';
    popup.style.verticalAlign = 'middle';
    popup.style.borderRadius = '1rem';
    popup.style.padding = ".1rem .5rem";
    popup.style.display = 'flex';
    popup.style.justifyContent = 'center';
    popup.style.alignItems = 'center';
    popup.style.width = '70px';
    popup.style.height = '25px';
    popup.style.border = '1px solid #99BC85';
    popup.style.color = '#fff';
    popup.textContent = "Click here";
    popup.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.35)";

    popup.addEventListener('mousedown', function (e) {
        sendDataToServer(selectedText);
    });

    document.body.appendChild(popup);

    // Listen for mouseup events
    document.addEventListener('mouseup', function (e) {
        selectedText = window.getSelection().toString();
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


function showNotification(message, type = 'success') {
    // Create a new div element for the notification
    var notification = document.createElement('div');
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    if (type === 'success') {
        notification.style.backgroundColor = '#4CAF50';
    } else if (type === 'error') {
        notification.style.backgroundColor = '#f44336';
    }
    notification.style.color = 'white';
    notification.style.padding = '15px';
    notification.style.borderRadius = '5px';
    notification.style.zIndex = '9999';
    notification.innerText = message;

    // Create a new span element for the close button
    var closeButton = document.createElement('span');
    closeButton.style.float = 'right';
    closeButton.style.marginLeft = '15px';
    closeButton.style.cursor = 'pointer';
    closeButton.innerText = 'X';

    // Add an event listener to the close button to remove the notification when clicked
    closeButton.addEventListener('click', function() {
        document.body.removeChild(notification);
    });

    // Add the close button to the notification
    notification.appendChild(closeButton);

    // Append the notification to the body
    document.body.appendChild(notification);

    // After 2 seconds, remove the notification
    setTimeout(function() {
        if (document.body.contains(notification)) {
            document.body.removeChild(notification);
        }
    }, 2000);
}
