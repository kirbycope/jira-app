// Globals
window.jiraUrl; // "rest/api/latest/";
window.username;
window.password;
window.rememberMe;

function enableSignInButton(){
	$('#buttonSignIn').prop('disabled', false);
}

function invalidCredentials(){
	enableSignInButton();
	// Tell the user something is amiss
	$('#divSignInErrorMessage').css('visibility', 'visible');
}

function signInSucess(){
	enableSignInButton();
	// Hide the Sign In Conatiner
	$('#divSignInContainer').css("display", "none");
	// Update the "Welcome, {name}" header in the dashboard
	$('#headerWelcomeName').html('Welcome, <i>' + window.username + '</i>!');
	// Show the dashboard
	$('#dashboard').css("display", "block");
}

function testCredentials(){
	// http://api.jquery.com/jquery.ajax/
	$.ajax
	({
		type: 'GET',
		url: window.jiraUrl + 'rest/auth/latest/session',
		dataType: 'json',
		async: true,
		headers: {
			'Authorization': 'Basic ' + btoa(window.username + ':' + window.password)
		},
		success: function (data){
			signInSucess();
		},
		error: function (data){
			invalidCredentials();
		}
	});
}

function signIn(e){
	// Prevent form's default submit behaviour
	e.preventDefault();
	// Disable the Sign In Button
	$('#buttonSignIn').prop('disabled', true);
	// Get the URL
	window.jiraUrl = $('#inputJiraUrl').val();
	// Get the Username
	window.username = $('#inputUsername').val();
	// Get the Password
	window.password = $('#inputPassword').val();
	// Get Remember Me
	window.rememberMe = $('#checkboxRememberMe').is(':checked');
	// If Remember Me is checked, then save our values
	if (window.rememberMe) {
		chrome.storage.sync.set({
			"jiraUrl": window.jiraUrl,
			"username": window.username,
			"password": window.password,
			"rememberMe": window.rememberMe
		}, function (){
			// See if the creds work
			testCredentials(window.jiraUrl, window.username, window.password);
		});
	}
	else {
		chrome.storage.sync.set({
			"jiraUrl": "",
			"username": "",
			"password": "",
			"rememberMe": ""
		}, function (){
			// See if the creds work
			testCredentials(window.jiraUrl, window.username, window.password);
		});
	}
}

// Set on-click of the Sign In button
$( document ).ready(function() {
	$('#buttonSignIn').click(this, signIn);
});
