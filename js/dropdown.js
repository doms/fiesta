playlist = []; // store all songs in here
playlistX = 0;

(function() {
  $("html").on("dragover", function(event) {
    event.preventDefault();
    event.stopPropagation();
    $(this).addClass('dragging');
  });

  $("html").on("dragleave", function(event) {
      event.preventDefault();
      event.stopPropagation();
      $(this).removeClass('dragging');
  });

  $("html").on("drop", function(event) {
      event.preventDefault();
      event.stopPropagation();

      files = event.originalEvent.dataTransfer.files;

	  $.each(files, function(index, obj) {
	  	//COOKIE STORE PERSITANT PLAYLISTS?
	  	//var reader = new FileReader();
	  	//reader.onload = fileLoaded;
	  	//reader.readAsDataURL(obj);

	  	pushPlaylist(URL.createObjectURL(obj), obj)
	  })
  });

})();

// add song to playlist
fileLoaded = function(e) {
	pushPlaylist(e.target.result);
};

playSelectedTrack = function(event) {
	track = $(this).attr('data-track');
	playTrack(playlist[track]);

	$('.track-playing').removeClass('track-playing');
	$(this).addClass('track-playing');
}

function pushPlaylist(file, meta) {
	var audio = new Audio();
	audio.src = file;

	audio.addEventListener('loadedmetadata', function() {
	  	var trackName = meta.name.replace('.mp3', '');

	   	// we don't want too long of a track name....
	   	cutTrackName = trackName.substring(0, 25);

	    // ...so we'll trim the name and add generic dots for the suffix
	    if(cutTrackName !== trackName) {
	    	cutTrackName += '...';
	    }

	    // length of song (hh:mm:ss)
	    trackDuration = convertToTimestamp(audio.duration);

	    // song info for when we add a new song to the playlist
	    playlist.push({
			blob: file,
			fullName: trackName,
			cutName: cutTrackName,
			audio: audio,
			length: trackDuration,
			dom: $('#track-list').append($('<tr class="track" data-track="' + playlistX + '"><td class="playing-arrow"><img width="15" src="images/ball-triangle.svg" /></td><td>' + cutTrackName + '</td><td class="track-length">' + trackDuration + '</td></tr>').click(playSelectedTrack))
		})

	    // if only one song, immediately start song, and show "track playing" information
	    if(playlist.length === 1) {
	    	playTrack(playlist[playlistX]);
	    	$('#track-list tr[data-track="' + playlistX + '"]').addClass('track-playing');
	    }

		playlistX++;

		$('.drop-message').hide(); // hides the "Drag & drop message" when first song has been added
	});
}

function convertToTimestamp(duration) {
	var hours = parseInt( duration / 3600 ) % 24;
	var minutes = parseInt( duration / 60 ) % 60;
	var seconds = Math.round(duration % 60);

	if(seconds < 10) {
		seconds = '0' + seconds;
	}

	return minutes + ':' + seconds;
}
