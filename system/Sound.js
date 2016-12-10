"use strict";

function Sound (sound, looping) {
	this.looping = typeof looping !== 'undefined' ? looping: false;
	this.snd = new Audio();
	if (this.snd.canPlayType("audio/mp3")) {
		this.snd.src = sound + ".mp3";
	} else if (this.snd.canPlayType("audio/ogg")) {
		this.snd.src = sound + ".ogg";
	} else {
		this.snd = null;
		alert("Browser cannot play audio, sorry.")
	}
}

Sound.prototype.play = function () {
    if (this.snd === null) {
        return;
    } else {
    	this.snd.load();
    	this.snd.autoplay = true;
	}
    if (!this.looping) {
        return;
    } else {
	    this.snd.addEventListener('ended', function () {
	        this.load();
	        this.autoplay = true;
	    }, false);
	}
};	

Object.defineProperty(Sound.prototype, 'volume',
	{
		get : function () {
			return this.snd.volume;
		},
		set : function (value) {
			this.snd.volume = value;
		}
	});