var bucketName = "evaporatinglink";

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

/* On load function */
function onLoad(){
	var downLink = document.getElementById("downLink");
	downLink.textContent = "> Loading";
	var link = getParameterByName("f");
	if (link == null || link == ''){
		document.getElementById("downHolder").innerHTML = "Unable to source file";
	} else {
		// Bypass CloudFront and access directly
		downLink.href = 'https://s3-ap-southeast-2.amazonaws.com/' + bucketName + '/evaporating/' + link;
		downLink.textContent = "Click to download";
		downLink.click();
	}
}
onLoad();
