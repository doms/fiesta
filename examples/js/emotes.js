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
    var PogChamp = '../images/twitch/pogchamp.png',
        Kappa = '../images/twitch/kappa.png',
        ResidentSleeper = '../images/twitch/residentsleeper.png',
        SeemsGood = '../images/twitch/seemsgood.png';

    // BTTV Emotes
    var BlacKappa = '../images/BTTV/Blackappa.png',
        FeelsAmazingMan = '../images/BTTV/FeelsAmazingMan.png',
        LUL = '../images/BTTV/LUL.png',
        VisLaud = '../images/BTTV/VisLaud.png';


    var twitchEmotes = [PogChamp, Kappa, ResidentSleeper, SeemsGood];
    var bttvEmotes = [BlacKappa, FeelsAmazingMan, LUL, VisLaud];

// ---------------------------------------------------------------------

    var twitchImageObj = new Image();
    twitchImageObj.src = '../images/twitch/pogchamp.png';
    // twitchImageObj.src = twitchEmotes[Math.floor(Math.random() * twitchEmotes.length)];


    var bttvImageObj = new Image();
    bttvImageObj.src = '../images/BTTV/VisLaud.png';
    // bttvImageObj.src = bttvEmotes[Math.floor(Math.random() * bttvEmotes.length)];



    this.bind('update', function() {
      var spectrum = this.getSpectrum();
      ctx.clearRect(0, 0, w, h);


      for (var i = 0, l = spectrum.length; i < l && i < count; i++) {
        if ($('input[name="settings-bars"]').prop('checked')) {
          ctx.fillRect(i * (spacing + width + widthMultiplier), h, width + 10, -spectrum[i] * h * heightMultiplier);
        }

        // Twitch mode; PogChamp, SeemsGood, Kappa, ResidentSleeper
        if($('input[name="settings-twitch"]').prop('checked')) {
          ctx.drawImage(twitchImageObj, i * (spacing + width + widthMultiplier) - 2,  -spectrum[i] * h * heightMultiplier + h - emoteOffsetH, 18, 18);
        }

        // TODO: show certain emotes depending on height of rectangle.

        // BTTV Mode; FeelsAmazingMan, Blackappa, LUL, VisLaud
        if($('input[name="settings-bttv"]').prop('checked')) {
          ctx.drawImage(bttvImageObj, i * (spacing + width + widthMultiplier) - 2,  -spectrum[i] * h * heightMultiplier + h - emoteOffsetH, 18, 18);
        }

        // TODO: show certain emotes depending on height of rectangle.

        if($('input[name="settings-fiesta"]').prop('checked')) {
          ctx.drawImage(twitchImageObj, i * (spacing + width + widthMultiplier) - 2,  -spectrum[i] * h * heightMultiplier + h - emoteOffsetH, 18, 18);
          twitchImageObj.src = twitchEmotes[Math.floor(Math.random() * twitchEmotes.length)];

          ctx.drawImage(bttvImageObj, i * (spacing + width + widthMultiplier) - 2,  -spectrum[i] * h * heightMultiplier + h - emoteOffsetH, 18, 18);
          bttvImageObj.src = bttvEmotes[Math.floor(Math.random() * bttvEmotes.length)];
        }
      }

    });

    return this;
  });
})();
