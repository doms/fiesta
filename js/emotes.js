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

    var imageObj = new Image();
    // imageObj.src = '../images/twitch/residentsleeper.png'; // start at no hype



    this.bind('update', function() {
      var spectrum = this.getSpectrum();
      ctx.clearRect(0, 0, w, h);


      for (var i = 0, l = spectrum.length; i < l && i < count; i++) {
        if ($('input[name="settings-bars"]').prop('checked')) {
          ctx.fillRect(i * (spacing + width + widthMultiplier), h, width + 10, -spectrum[i] * h * heightMultiplier);
        }
        
        // Twitch mode
        if($('input[name="settings-twitch"]').prop('checked')) {

          // TODO: we don't want the twitch & bttv emotes overlapping, so we turn off the bttv emotes when twitch mode is selected.

          // TODO: find proper way to check for "kick" height
          if () {
            imageObj.src = '../images/twitch/pogchamp.png';
            ctx.drawImage(imageObj, i * (spacing + width + widthMultiplier) - 2,  -spectrum[i] * h * heightMultiplier + h - emoteOffsetH, 18, 18);
          } else if () {
            imageObj.src = '../images/twitch/seemsgood.png';
            ctx.drawImage(imageObj, i * (spacing + width + widthMultiplier) - 2,  -spectrum[i] * h * heightMultiplier + h - emoteOffsetH, 18, 18);
          } else if () {
            imageObj.src = '../images/twitch/kappa.png';
            ctx.drawImage(imageObj, i * (spacing + width + widthMultiplier) - 2,  -spectrum[i] * h * heightMultiplier + h - emoteOffsetH, 18, 18);
          } else {
            imageObj.src = imageObj.src;
            ctx.drawImage(imageObj, i * (spacing + width + widthMultiplier) - 2,  -spectrum[i] * h * heightMultiplier + h - emoteOffsetH, 18, 18);
          }
        }

        // BTTV Mode
        if($('input[name="settings-bttv"]').prop('checked')) {


          if () {
            // imageObj.src = '../images/BTTV/';
            ctx.drawImage(imageObj, i * (spacing + width + widthMultiplier) - 2,  -spectrum[i] * h * heightMultiplier + h - emoteOffsetH, 18, 18);
          } else if () {
            // imageObj.src = '../images/BTTV/';
            ctx.drawImage(imageObj, i * (spacing + width + widthMultiplier) - 2,  -spectrum[i] * h * heightMultiplier + h - emoteOffsetH, 18, 18);
          } else if () {
            // imageObj.src = '../images/BTTV/';
            ctx.drawImage(imageObj, i * (spacing + width + widthMultiplier) - 2,  -spectrum[i] * h * heightMultiplier + h - emoteOffsetH, 18, 18);
          } else {
            // imageObj.src = imageObj.src;
            ctx.drawImage(imageObj, i * (spacing + width + widthMultiplier) - 2,  -spectrum[i] * h * heightMultiplier + h - emoteOffsetH, 18, 18);
          }
        }
      }
    });

    return this;
  });
})();