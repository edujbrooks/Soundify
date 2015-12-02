var player1;
var player2;

function onPlayerReady(event) {
    event.target.playVideo();
	event.target.setVolume(0);
}

function onPlayerReady2(event) {
	event.target.playVideo();
	event.target.unMute();
	event.target.setVolume(100);
}

$( document ).ready(function() {
	//YOUTUBE IFRAME API
	if ($("#videoType").val()==="youtube" || $("#soundType").val()==="youtube") {
		var tag = document.createElement('script');
		tag.src = "//www.youtube.com/iframe_api";
		var firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	}
	//image in video
	if ($("#videoType").val()==="image") {
		image = new Image();
		image.src = $("#videoUrl").text();
		image.onload = function () {
			$('#player1').append(image);
		};
	}
});

function onYouTubeIframeAPIReady() {

	if ($("#videoType").val()==="youtube") {
		var id = getYoutubeId($("#videoUrl").text());

		player1 = new YT.Player('player1', {
			height: '700',
			width: '850',
			videoId: id,
			playerVars: { 'start': $("#videoSeconds").val() },
			events: {
				'onReady': onPlayerReady
			}
		});
	}

	if ($("#soundType").val()==="youtube") {
		var id = getYoutubeId($("#soundUrl").text());
		player2 = new YT.Player('player2', {
			height: '80',
			width: '425',
			videoId: id,
			playerVars: { 'start': $("#soundSeconds").val() },
			events: {
				'onReady': onPlayerReady2
			}
		});
	}
}


function getYoutubeId(Url) {
	var video_id = Url.split('v=')[1];
	var ampersandPosition = video_id.indexOf('&');
	if(ampersandPosition != -1) {
	  video_id = video_id.substring(0, ampersandPosition);
	}
	return video_id;
}
