dancer = new Dancer();
volume = 0.5;
ctx = fft.getContext('2d');
fft = document.getElementById('fft');
updateSlider = true;

(function () {
  if(!(window.ActiveXObject) && "ActiveXObject" in window) {
     $('.drop-message').text('INTERNET EXPLORER IS NOT SUPPORTED!');
  }

  Dancer.setOptions({
    flashSWF: '../../lib/soundmanager2.swf',
    flashJS: '../../lib/soundmanager2.js'
  });

  // controls the seeker (how long the song has been playing and what point it's at in the song)
  $('.seeker').slider({
    start: function(event, ui) {
      updateSlider = false;
    },
    stop: function(event, ui) {
      updateSlider = true;
      var seekTo = (ui.value / 100) * dancer.audio.duration;

      if(dancer.audio) {
        dancer.audio.currentTime = seekTo;
      }
    }
  });

  // controls the volume slider
  $('.volume').slider({
    value: 50,
    slide: function(event, ui) {
      volume = ui.value / 100;

      if(dancer.audio) {
        dancer.setVolume(volume);
      }
    }
  });

  // 
  $('.button-stop').click(function() {
    dancer.pause();
    setStatusPaused();
  })

  $('.button-play').click(function() {
    if(playlist.length) {
      dancer.play();
      setStatusPlaying();
    }
  })

  $('.button-back').click(function() {
    var currentTrack = $('.track-playing');

    if(currentTrack.length) {
      nextTrack = parseInt(currentTrack.attr('data-track')) - 1;
      
      if(nextTrack < 0) {
        dancer.audio.currentTime = 0;
      } else {
        playTrack(playlist[nextTrack]);
        $('.track-playing').removeClass('track-playing');
        $($('#track-list tr')[nextTrack]).addClass('track-playing');
      }
      
      setStatusPlaying();
    }
  })

  $('.button-forward').click(function() {
    playNextTrack();
  })

  setInterval(function() {
    if(dancer && dancer.audio) {
      if(updateSlider) {
        var progress = dancer.audio.currentTime / dancer.audio.duration * 100;
        $('.seeker').slider('value', progress);

        if(progress === 100) {
          dancer.pause();
          playNextTrack();
        }
      }
    }
  }, 100)

})();

function playTrack(track) {
  dancer.pause();

  if(dancer.audioAdapter.context.close) {
    dancer.audioAdapter.context.close();
  }

  dancer = null;
  dancer = new Dancer();

  kick = dancer.createKick({
    onKick: function () {
      ctx.fillStyle = '#3B87F9';
    },
    offKick: function () {
      ctx.fillStyle = '#3B87F9';
    }
  }).on();

  audio = new Audio();
  audio.src = track.blob

  dancer.fft( fft, { fillStyle: '#666' });
  dancer.load(audio);
  dancer.setVolume(volume);
  dancer.play();

  setStatusPlaying();
}

function setStatusPlaying() {
  if(!$('body').hasClass('is-playing')) {
    $('body').addClass('is-playing');
  }

  $('.drop-message').hide(); // hides "drag & drop" message 
}

function setStatusPaused() {
  if($('body').hasClass('is-playing')) {
    $('body').removeClass('is-playing');
  }
}

function playNextTrack() {
  var currentTrack = $('.track-playing');

  if(currentTrack.length) {
    nextTrack = parseInt(currentTrack.attr('data-track')) + 1;

    console.log(playlist[nextTrack]);

    if(playlist[nextTrack]) {
      playTrack(playlist[nextTrack]);
      $('.track-playing').removeClass('track-playing');
      $($('#track-list tr')[nextTrack]).addClass('track-playing');
    } else {
      playTrack(playlist[0]);
      $('.track-playing').removeClass('track-playing');
      $($('#track-list tr')[0]).addClass('track-playing');
    }

    setStatusPlaying();
  }
}