//Function to redirect to homepage after login
var getRedirectPath = function() {
	return "/content/wknd/us/en/jackson-home-page.html";
}
var userData;
// Make a call to servlet to fetch user details
var fetchUserDetails = function(user) {
	$.ajax({
		url: "/bin/security/authorizables.json?filter=" + user,
		async: false,
		success: function(data, textStatus, jqXHR) {
			if (data && data.authorizables) {
				var userData = data.authorizables[0];
				//alert('fetched user details successfully');
				if (userData.city) {
					setCookie("user_city", userData.city, 30);
				}
				if (userData.country) {
					setCookie("user_country", userData.country, 30);
				}
				if (userData.email) {
					setCookie("user_email", userData.email, 30);
				}
				if (userData.gender) {
					setCookie("user_gender", userData.gender, 30);
				}
				if (userData.name) {
					var firstName = userData.name.split(" ")[0];
					var lastName = userData.name.split(" ")[1];
					if (firstName) {
						setCookie("user_fName", firstName, 30);
					}
					if (lastName) {
						setCookie("user_lName", lastName, 30);
					}
				}
				if (userData.postalCode) {
					setCookie("user_postalCode", userData.postalCode, 30);
				}
				if (userData.street) {
					setCookie("user_street", userData.street, 30);
				}
				//alert(getCookie("user_fName"));

			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			$("#errordiv").val("Unable to fetch User Details");
		}
	});
}


// Function for setting cookies at login page
function setCookie(cname, cvalue, exdays) {
	const d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	let expires = "expires=" + d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";";
	//alert('user cookie set');
}

// Function for getting cookies at login page
function getCookie(cname) {
	let name = cname + "=";
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca = decodedCookie.split(';');
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

// Function for checking cookies at login page
var checkCookie = function() {
	var userFName = getCookie("user_fName");
	if (userFName != "") {
		$('.user-first-name').find('input[type=text]').val(userFName);
	}
    var userLName = getCookie("user_lName");
	if (userLName != "") {
		$('.user-last-name').find('input[type=text]').val(userLName);
	}
    var userEmail = getCookie("user_email");
	if (userEmail != "") {
		$('.user-email-address').find('input[type=text]').val(userEmail);
	}
    var userStreet = getCookie("user_street");
	if (userStreet != "") {
		$('.user-street').find('input[type=text]').val(userStreet);
	}
    var userZip = getCookie("user_postalCode");
	if (userZip != "") {
		$('.user-zip-code').find('input[type=text]').val(userZip);
	}
    var userCountry = getCookie("user_country");
	if (userCountry != "") {
		$('.user-country').find('input[type=text]').val(userCountry);
	}
    var userCity = getCookie("user_city");
	if (userCity != "") {
		$('.user-city').find('input[type=text]').val(userCity);
	}
    
}

// Function for validating Login form
var validateForm = function() {
	var valid = false;
	if (($("#userId").val().length > 0) || ($("#inputPassword").val().length > 0)) {
		valid = true;
	}
	return valid;
}

$(function() {
	checkCookie();

	$("#inputPassword").keyup(function(event) {
		if (event.keyCode == 13) {
			$("#loginButton").click();
		}
	})

	$("#loginButton").click(function(e) {

		//e.preventDefault();

		var valid = validateForm();
		if (valid) {
			$.ajax({
				type: "POST",
				url: $('#url').val(),
				data: {
					j_username: $("#userId").val(),
					j_password: $("#inputPassword").val(),
					j_validate: "true"
				},
				success: function(data, textStatus, jqXHR) {
					//console.log(data);
					// alert(data);
					//alert('loggedIn Successfully');
					fetchUserDetails($("#userId").val());
					window.location.href = getRedirectPath();
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					$("#errordiv").val("Invalid User Name or Password");
				}
			});
		} else {
			$("#errordiv").val("Invalid User Name or Password");
		}
	});
	//console.log('loading on every page');
});