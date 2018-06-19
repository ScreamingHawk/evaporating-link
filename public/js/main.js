var bucketName = "evaporating.link";

var instructions = document.getElementById('instructions');

/* Update instructions for the user */
function updateInstructions(message) {
	// Clear QR code
	updateQRCode();
	instructions.textContent = message;
}

/* Render the Google Sign in button */
function renderButton() {
	gapi.signin2.render('gSignIn', {
		'scope': 'profile email',
		'width': 240,
		'height': 50,
		'longtitle': true,
		'theme': 'light',
		'onsuccess': onGSuccess,
		'onfailure': onGFailure
	});
}

/* User signed in */
function onGSuccess(googleUser) {
	// Hide the sign in button
	document.getElementById('gSignIn').className += ' hidden';
	// Show the upload box
	document.getElementById('fileup').className = '';

	// Update instructions
	var gName = googleUser.getBasicProfile().getGivenName();
	console.log('Logged in as: ' + gName);
	updateInstructions('Hi ' + gName);

	// Add the Google access token to the Cognito credentials login map.
	AWS.config.credentials = new AWS.CognitoIdentityCredentials({
		IdentityPoolId: 'ap-southeast-2:ef05d571-a436-44e6-9aa2-5c968a3be9e4',
		Logins: {
			'accounts.google.com': googleUser.getAuthResponse().id_token
		}
	});
	AWS.config.region = 'ap-southeast-2';
}

/* User sign in failed */
function onGFailure(error) {
	console.log('Failure: ' + error);
	updateInstructions("Sign in failed. Try again");
}


/* File selected */
var fname = null;
function fileSelected(obj){
	var fileup = document.getElementById('fileup');
	if (obj.target.value) {
		fname = obj.target.value.split("\\").pop();
		if (fname.length > 20){
			fileup.textContent = fname.substr(0, 19) + '...';
		} else {
			fileup.textContent = fname;
		}
		fileup.className = 'label';
		document.getElementById('upload').className = '';
		updateInstructions("Send it up");
	} else {
		// Or not
		fname = null;
		fileup.textContent = 'Choose a file';
		fileup.className = '';
		document.getElementById('upload').className = 'hidden';
		updateInstructions("Select a file");
	}
}
document.getElementById('file').onchange = fileSelected

/* User click upload */
function uploadFile(){
	var files = document.getElementById('file').files;
	if (!files.length) {
		updateInstructions('Select a file');
		return;
	}
	// Unset the button
	updateInstructions('Please wait...');
	document.getElementById('upload').className = 'hidden';
	// Obtain AWS credentials
	AWS.config.credentials.get(function(){
		// Create S3
		var key = 'evaporating/'+fname;
		console.log(key);
		new AWS.S3().upload({
			partSize: 10 * 1024 * 1024,
			queueSize: 4,
			Bucket: bucketName,
			Key: key,
			Body: files[0],
			ACL: 'public-read-write',
			StorageClass: 'REDUCED_REDUNDANCY'
		}, function(err, data){
			if (err){
				updateInstructions('Sorry! Error uploading');
				console.log(err.message);
			} else {
				var getUrl = window.location;
				var linky = getUrl.protocol + '//' + getUrl.host + getUrl.pathname +
						'download.html?f=' + encodeURI(fname);
				instructions.innerHTML = '<a href="' + linky + '">Linky</a>';
				updateQRCode(linky);
			}
		});
	});
}
document.getElementById('upload').onclick = uploadFile;

/* On load function */
function onLoad(){
	updateInstructions("Sign in");
}
onLoad();
