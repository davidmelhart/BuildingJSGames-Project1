"use strict";

function Canvas2D_Singleton () {
	this._canvas = null;
	this._canvasContext = null;
}

Canvas2D_Singleton.prototype.init = function (canvas) {
	this._canvas = document.getElementById(canvas);
	this._canvasContext = this._canvas.getContext("2d");
};

Canvas2D_Singleton.prototype.drawImage = function (sprite, position, rotation, origin) {
    position = typeof position !== 'undefined' ? position : Vector2.zero;
    rotation = typeof rotation !== 'undefined' ? rotation : 0;
    origin = typeof origin !== 'undefined' ? origin : Vector2.zero;

	this._canvasContext.save();
	this._canvasContext.translate(position.x, position.y);
	this._canvasContext.rotate(rotation);
	this._canvasContext.drawImage(sprite, 0, 0, sprite.width, sprite.height, -origin.x, -origin.y, sprite.width, sprite.height);
	this._canvasContext.restore();
};

Canvas2D_Singleton.prototype.clear = function () {
	this._canvasContext.clearRect(0, 0, this._canvas.width, this._canvas.height);
};

Canvas2D_Singleton.prototype.fill = function(color) {
    this._canvasContext.save();
    this._canvasContext.translate(0, 0);
	this._canvasContext.fillStyle = color;
	this._canvasContext.fillRect(0, 0, this._canvas.width, this._canvas.height);
	this._canvasContext.restore();
};

Canvas2D_Singleton.prototype.drawText = function(text, position, color, textAlign, fontname, fontsize) {
    position = typeof position !== 'undefined' ? position : Vector2.zero;
    color = typeof color !== 'undefined' ? color : Color.white;
    textAlign = typeof textAlign !== 'undefined' ? textAlign : "top";
    fontname = typeof fontname !== 'undefined' ? fontname : "Courier New";
    fontsize = typeof fontsize !== 'undefined' ? fontsize : "20px";

    this._canvasContext.save();
    this._canvasContext.translate(position.x, position.y);
    this._canvasContext.textBaseline = 'top';
    this._canvasContext.font = fontsize + " " + fontname;
    this._canvasContext.fillStyle = color.toString();
    this._canvasContext.textAlign = textAlign;
    this._canvasContext.fillText(text, 0, 0);
    this._canvasContext.restore();
}

var Canvas2D = new Canvas2D_Singleton();