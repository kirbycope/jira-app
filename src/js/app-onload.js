// Check if Remember Me was set to true
chrome.storage.sync.get("rememberMe", function (result){
	if (result.rememberMe){
		chrome.storage.sync.get(["jiraUrl", "username", "password"], function (data){
			$('#inputJiraUrl').val(data.jiraUrl);
			$('#inputUsername').val(data.username);
			$('#inputPassword').val(data.password);
			$('#checkboxRememberMe').prop('checked', true);
		});
	}
});