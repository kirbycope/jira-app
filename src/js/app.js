// Open html file and set window size
chrome.app.runtime.onLaunched.addListener(function() {
	chrome.app.window.create('index.html', {
		'outerBounds': {
			'width': 500,
			'height': 380
		}
	});
});
