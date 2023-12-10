// Get the login button and login popup
const loginButton = document.getElementById('loginButton');
const loginPopup = document.getElementById('loginPopup');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');


// Show the login popup
function showPopup() {
    //loginPopup.style.display = 'block';
    window.location.href="/content/brightspeed/us/en/jakson-log-in.html";
}

// Close the login popup
function closePopup() {
    loginPopup.style.display = 'none';
}

function storeCredentials(event){
    event.preventDefault();

    const username = usernameInput.value;
    const password = passwordInput.value;

    if(typeof Storage !== 'undefined'){
        sessionStorage.setItem('username', username);
        sessionStorage.setItem('password', password);

        closePopup();
    }else{
        console.error('Session storage is not supported');
        
    }
}

// Check if session storage is available
if (typeof Storage !== 'undefined') {
    // Retrieve values from session storage
    const storedUsername = sessionStorage.getItem('username');
    const storedPassword = sessionStorage.getItem('password');
    // Check if values are not null or undefined
    if (storedUsername && storedPassword) {
        console.log('Username:', storedUsername);
        console.log('Password:', storedPassword);
        // Do something with the stored values
    } else {
        console.log('Values are not stored in session storage.');
    }
} else {
    console.error('Session storage is not supported.');
}


// Attach event listener to the login button
loginButton.addEventListener('click', showPopup);