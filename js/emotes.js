/*
 * FFT plugin for dancer.js (specifically for emotes)
 *
 * Usage of frequencies being 2px with 1px spacing:
 *
 * var dancer = new Dancer('song.ogg'),
 *     canvas = document.getElementById('fftcanvas');
 *
 * dancer.fft(canvas, {width: 2, spacing: 1});
 */

(function() {
  Dancer.addPlugin('fft', function(canvasEl, options) {
    options = options || {};
    var
      ctx     = canvasEl.getContext('2d'),
      h       = canvasEl.height,
      w       = canvasEl.width,
      width   = options.width || 1,
      spacing = options.spacing || 0,
      count   = options.count || 45;
      widthMultiplier = 19;
      heightMultiplier = 1.7;
      emoteOffsetH = 15;
      lastUpdate = 0;
      doUpdateAt = 0;

    ctx.fillStyle = options.fillStyle || "white";
// ---------------------------------------------------------------------
    /* Random Emotes Testing */

    // Twitch Emotes
    var PogChamp = '/img/twitch/pogchamp.png',
        Kappa = '/img/twitch/kappa.png',
        ResidentSleeper = '/img/twitch/residentsleeper.png',
        SeemsGood = '/img/twitch/seemsgood.png';

    var emotes = [PogChamp, Kappa, ResidentSleeper, SeemsGood];

// ---------------------------------------------------------------------

    var emotesObj = new Image();
    emotesObj.src = emotes[Math.floor(Math.random() * emotes.length)];

    var fiestaObj = new Image();
    fiestaObj.src = emotes[Math.floor(Math.random() * emotes.length)];


    this.bind('update', function() {
      var spectrum = this.getSpectrum();
      ctx.clearRect(0, 0, w, h);


      for (var i = 0, l = spectrum.length; i < l && i < count; i++) {
        if ($('input[name="settings-bars"]').prop('checked')) {
          ctx.fillRect(i * (spacing + width + widthMultiplier), h, width + 10, -spectrum[i] * h * heightMultiplier);
        }

        if($('input[name="settings-twitch"]').prop('checked')) {
          ctx.drawImage(emotes, i * (spacing + width + widthMultiplier) - 2,  -spectrum[i] * h * heightMultiplier + h - emoteOffsetH, 18, 18);
        }

        // TODO: show certain emotes depending on height of rectangle.
        if($('input[name="settings-fiesta"]').prop('checked')) {
          ctx.drawImage(fiestaObj, i * (spacing + width + widthMultiplier) - 2,  -spectrum[i] * h * heightMultiplier + h - emoteOffsetH, 18, 18);
          fiestaObj.src = emotes[Math.floor(Math.random() * emotes.length)];
        }
      }

    });

    return this;
  });
})();
