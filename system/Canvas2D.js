"use strict";

function Canvas2D_Singleton () {
	this.canvas = undefined;
	this.canvasContext = undefined;
}

Canvas2D_Singleton.prototype.init = function (canvas) {
	this.canvas = document.getElementById(canvas);
	this.canvasContext = this.canvas.getContext("2d");
};

Canvas2D_Singleton.prototype.drawImage = function (sprite, position, rotation, origin) {
	this.canvasContext.save();
	this.canvasContext.translate(position.x, position.y);
	this.canvasContext.rotate(rotation);
	this.canvasContext.drawImage(sprite, 0, 0, sprite.width, sprite.height, -origin.x, -origin.y, sprite.width, sprite.height);
	this.canvasContext.restore();
};

Canvas2D_Singleton.prototype.clear = function () {
	this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

var Canvas2D = new Canvas2D_Singleton();