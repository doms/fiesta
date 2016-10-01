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
    var PogChamp = '../img/twitch/pogchamp.png',
        Kappa = '../img/twitch/kappa.png',
        ResidentSleeper = '../img/twitch/residentsleeper.png',
        SeemsGood = '../img/twitch/seemsgood.png';

    // BTTV Emotes
    var BlacKappa = '../img/BTTV/Blackappa.png',
        FeelsAmazingMan = '../img/BTTV/FeelsAmazingMan.png',
        LUL = '../img/BTTV/LUL.png',
        VisLaud = '../img/BTTV/VisLaud.png';


    var twitchEmotes = [PogChamp, Kappa, ResidentSleeper, SeemsGood];
    var bttvEmotes = [BlacKappa, FeelsAmazingMan, LUL, VisLaud];
    var fiesta = [PogChamp, Kappa, ResidentSleeper, SeemsGood, BlacKappa, FeelsAmazingMan, LUL, VisLaud];

// ---------------------------------------------------------------------

    var twitchImageObj = new Image();
    twitchImageObj.src = twitchEmotes[Math.floor(Math.random() * twitchEmotes.length)];


    var bttvImageObj = new Image();
    bttvImageObj.src = bttvEmotes[Math.floor(Math.random() * bttvEmotes.length)];


    var fiestaImageObj = new Image();
    fiestaImageObj.src = fiesta[Math.floor(Math.random() * bttvEmotes.length)];


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

        if($('input[name="settings-bttv"]').prop('checked')) {
          ctx.drawImage(bttvImageObj, i * (spacing + width + widthMultiplier) - 2,  -spectrum[i] * h * heightMultiplier + h - emoteOffsetH, 18, 18);
        }

        // TODO: show certain emotes depending on height of rectangle.

        if($('input[name="settings-fiesta"]').prop('checked')) {
          ctx.drawImage(fiestaImageObj, i * (spacing + width + widthMultiplier) - 2,  -spectrum[i] * h * heightMultiplier + h - emoteOffsetH, 18, 18);
          fiestaImageObj.src = fiesta[Math.floor(Math.random() * fiesta.length)];
        }
      }

    });

    return this;
  });
})();
