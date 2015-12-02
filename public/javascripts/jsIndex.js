
var youtubeRe = /(?:https?:\/\/)?(?:www\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w-_]+)/;
var imageRe = /\.(gif|jpg|jpeg|tiff|png)$/i;

$(document).ready(function(){
	$("#txtTitle").bind("input propertychange",updateTitleTxt);
	$("#txtVideoUrl").bind("input propertychange",updateVideoUrlTxt);
	$("#txtSoundUrl").bind("input propertychange",updateSoundUrlTxt);

	var link = generateRandomString();
	$("#hdnLink").val(link);

	prepareHelp();
});


function validateForm() {
	var ok = true;
	var title = document.forms["Form"]["soundify[title]"].value;
	var videoUrl = document.forms["Form"]["soundify[videoURL]"].value;
	var videoSeconds = document.forms["Form"]["soundify[videoSeconds]"].value;
	var soundUrl = document.forms["Form"]["soundify[soundURL]"].value;
	var soundSeconds = document.forms["Form"]["soundify[soundSeconds]"].value;

	//name
	if (title === null || title === "") {
		$("#errTitle").text("Title can't be empty. Name your creation!");
		ok = false;
	}

	switch(videoLinkCheck(videoUrl)) {
		case "youtube":
			$("#hdnVideoType").val("youtube");
			break;
		case "image":
			$("#hdnVideoType").val("image");
			break;
		case "unknown":
			ok = false;
			break;
	}

	switch(soundLinkCheck(soundUrl)) {
		case "youtube":
			$("#hdnSoundType").val("youtube");
			break;
		case "unknown":
			ok = false;
			break;
	}

	return ok;
}

function videoLinkCheck (videoUrl) {
	var type = "unknown";
	if (videoUrl.match(youtubeRe)) {
		type = "youtube";
	} else if (videoUrl.match(imageRe)){
		type = "image";
	}
	return type;
}

function soundLinkCheck (soundUrl) {
	var type = "unknown";
	if (soundUrl.match(youtubeRe)) type = "youtube";
	return type;
}

function updateTitleTxt () {
	var title = document.forms["Form"]["soundify[title]"].value;

	if (title === "") {
		$("#errTitle").text("Title can't be empty. Name your creation!");
	} else {
			$("#errTitle").text("");
	}
}

function updateVideoUrlTxt () {
	var videoUrl = document.forms["Form"]["soundify[videoURL]"].value;

	if (videoLinkCheck(videoUrl)==="unknown") {
		$("#errVideoUrl").text("Link seems wrong, please check");
		$("#errVideoUrl").removeClass();
		$("#errVideoUrl").addClass("error");
	} else {
		$("#errVideoUrl").text("Seems like the link is OK");
		$("#errVideoUrl").removeClass();
		$("#errVideoUrl").addClass("ok");

	}
}

function updateSoundUrlTxt () {
	var videoUrl = document.forms["Form"]["soundify[soundURL]"].value;

	if (soundLinkCheck(videoUrl)==="unknown") {
		$("#errSoundUrl").text("Link seems wrong, please check");
		$("#errSoundUrl").removeClass();
		$("#errSoundUrl").addClass("error");
	} else {
		$("#errSoundUrl").text("Seems like the link is OK");
		$("#errSoundUrl").removeClass();
		$("#errSoundUrl").addClass("ok");

	}
}

function generateRandomString(){
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for( var i=0; i < 10; i++ )
			text += possible.charAt(Math.floor(Math.random() * possible.length));

	return text;
}

function prepareHelp () {
	$('#imgVideo').qtip({
    content: {
		title: 'Supported VIDEO formats: Youtube link, Image link',
        text: 'Examples: <br>https://www.youtube.com/watch?v=9bZkp7q19f0<br>https://youtu.be/9bZkp7q19f0<br>http://i.imgur.com/aTU2R9B.jpg'

    },
	style: { classes: 'qtip-blue qtip-rounded qtip-shadow' }
	});

	$('#imgSound').qtip({
    content: {
		title: 'Supported SOUND formats: Youtube link',
        text: 'Examples: <br>https://www.youtube.com/watch?v=9bZkp7q19f0<br>https://youtu.be/9bZkp7q19f0'
    },
	style: { classes: 'qtip-blue qtip-rounded qtip-shadow' }
	})
}
