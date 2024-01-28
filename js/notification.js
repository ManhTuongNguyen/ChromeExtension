function showNotification(message, type = "success", time = 2000) {
    // Create a new div element for the notification
    var notification = document.createElement("div");
    notification.style.position = "fixed";
    notification.style.bottom = "20px";
    notification.style.right = "20px";
    if (type === "success") {
      notification.style.backgroundColor = "#4CAF50";
    } else if (type === "warning") {
      notification.style.backgroundColor = "#ff9800";
    } else if (type === "error") {
      notification.style.backgroundColor = "#f44336";
    }
    notification.style.color = "white";
    notification.style.padding = "15px";
    notification.style.borderRadius = "5px";
    notification.style.zIndex = "9999";
    notification.innerText = message;
  
    // Create a new span element for the close button
    var closeButton = document.createElement("span");
    closeButton.style.float = "right";
    closeButton.style.marginLeft = "15px";
    closeButton.style.cursor = "pointer";
    closeButton.innerText = "X";
  
    // Add an event listener to the close button to remove the notification when clicked
    closeButton.addEventListener("click", function () {
      document.body.removeChild(notification);
    });
  
    // Add the close button to the notification
    notification.appendChild(closeButton);
  
    // Append the notification to the body
    document.body.appendChild(notification);
  
    // After 2 seconds, remove the notification
    setTimeout(function () {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, time);
  }