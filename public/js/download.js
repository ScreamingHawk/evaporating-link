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
		downLink.href = 'evaporating/' + link;
		downLink.textContent = "Click here if your download doesn't start automatically";
		downLink.click();
	}
}
onLoad();