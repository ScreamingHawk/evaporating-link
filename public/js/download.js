var bucketName = "evaporating.link";

/* Get the query parameter
 * https://stackoverflow.com/a/901144/2027146
 */
function getParameterByName(name, url) {
	if (!url) url = window.location.href;
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, " "));
}

/**
 * Test file exists
 * https://stackoverflow.com/a/26631181/2027146
 */
function testFileExists(url) {
	var http = new XMLHttpRequest();
	http.open('HEAD', url, false);
	http.send();
	return http.status != 404;
}

/* On load function */
function onLoad() {
	var downLink = document.getElementById("downLink");
	downLink.textContent = "> Loading";

	var link = getParameterByName("f");
	if (link == null || link == '') {
		document.getElementById("downHolder").innerHTML = "Unable to source file";
	} else {
		// Bypass CloudFront and access directly
		var href = 'https://s3-ap-southeast-2.amazonaws.com/' + bucketName + '/evaporating/' + link;
		if (testFileExists(href)) {
			updateQRCode(window.location.href);

			downLink.href = href;
			downLink.textContent = "Click to download";
			downLink.click();
		} else {
			window.location = '/error.html';
		}
	}
}
onLoad();
