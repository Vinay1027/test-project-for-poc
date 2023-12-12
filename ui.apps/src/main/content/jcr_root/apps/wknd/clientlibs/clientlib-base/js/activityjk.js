document.addEventListener("DOMContentLoaded", function() {
    // Check if the cookie exists
    var userCookie = getCookie("user_fName");

    if (userCookie !== "") {
        // The cookie exists, so set the display property to block
        var elementToDisplay = document.getElementById("activityContainer"); // Replace with the actual ID of your element
        if (elementToDisplay) {
            elementToDisplay.style.display = "block";
        }
    }
});

// Function for getting cookies
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');

    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }

    return "";
}

//  function toggleDropdown(){
//     var dropdown = document.getElementById("activityDropdown");
//     dropdown.style.display = "block";
// }
 function toggleDropdown(){
    var dropdown = document.getElementById("popupContainer");
    dropdown.style.display = "block";
 }


    var popup = document.getElementById('popupContainer');

  function openPopup() {
    popup.style.display = 'block';
  }

  function closeContent() {
    popup.style.display = 'none';
  }

  function showTab(tabName) {
    var tabs = document.getElementsByClassName('tab-content');
    for (var i = 0; i < tabs.length; i++) {
      tabs[i].style.display = 'none';
    }
    document.getElementById(tabName + 'Tab').style.display = 'block';
  }

  function redirectToPage(pagePath) {
    window.location.href = pagePath;
  }


    var recentContent = document.getElementById('recentTab');
    var pendingContent = document.getElementById('pendingTab');
    var submittedContent = document.getElementById('submittedTab');
function recent(){
    recentContent.style.display='block';
    pendingContent.style.display='none';
    submittedContent.style.display='none';
}
function pending(){
    recentContent.style.display='none';
    pendingContent.style.display='block';
    submittedContent.style.display='none';
}
function submitted(){
    submittedContent.style.display='block';
    recentContent.style.display='none';
    pendingContent.style.display='none';
}