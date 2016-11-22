"use strict";

var sprites = {};
var spritesFolder = "./sprites/";

sprites.loader = function () {
	this.background = new Image();
	this.background.src = spritesFolder + "spr_background.jpg";
	this.cannonBarrel = new Image();
	this.cannonBarrel.src = spritesFolder + "spr_cannon_barrel.png";
	this.cannonRed = new Image();
	this.cannonRed.src = spritesFolder + "spr_cannon_red.png";
	this.cannonGreen = new Image();
	this.cannonGreen.src = spritesFolder + "spr_cannon_green.png";
	this.cannonBlue = new Image();
	this.cannonBlue.src = spritesFolder + "spr_cannon_blue.png";
}

var Canvas2D = {
	canvas: undefined,
	canvasContext: undefined
};

Canvas2D.init = function (canvas) {
	this.canvas = document.getElementById(canvas);
	this.canvasContext = this.canvas.getContext("2d");
}

Canvas2D.drawImage = function (sprite, position, rotation, origin) {
	this.canvasContext.save();
	this.canvasContext.translate(position.x, position.y);
	this.canvasContext.rotate(rotation);
	this.canvasContext.drawImage(sprite, 0, 0, sprite.width, sprite.height, -origin.x, -origin.y, sprite.width, sprite.height);
	this.canvasContext.restore();
}

var Mouse = {
	position: {x: 816, y: 10},
	leftDown: false,
	leftPressed: false
};

Mouse.handleMouseMove = function (event) {
	Mouse.position = {x: event.pageX - Canvas2D.canvas.offsetLeft, y: event.pageY - Canvas2D.canvas.offsetTop};
}

Mouse.handleMouseDown = function (event) {
	if (event.which === 1) {
		if (!Mouse.leftDown) {
			Mouse.leftPressed = true;
		}
		Mouse.leftDown = true;
	}
}

Mouse.handleMouseUp = function (event) {
	if (event.which === 1) {
		Mouse.leftDown = false;
	}
}

Mouse.reset = function () {
	Mouse.leftPressed = false;
}

var Keyboard = {
	keyDown: -1
};

Keyboard.handleKeyDown = function (event) {
	Keyboard.keyDown = event.keyCode;
}

var Keys = { 
	A: 65,     B: 66,      C: 67,      D: 68,       E: 69,      F: 70,
    G: 71,     H: 72,      I: 73,      J: 74,       K: 75,      L: 76,
    M: 77,     N: 78,      O: 79,      P: 80,       Q: 81,      R: 82,
    S: 83,     T: 84,      U: 85,      V: 86,       W: 87,      X: 88,
    Y: 89,     Z: 90
}

var cannon = {

};

cannon.init = function () {
	this.position = {x: 72, y: 405};
	this.origin = {x: 34, y: 34}; //height/2
	this.rotation = 0;
	this.currentColor = sprites.cannonRed;
	this.colorPosition = {x: 72, y: 405};
}

cannon.handleInput = function () {
	if (Keyboard.keyDown === Keys.R) {
		this.currentColor = sprites.cannonRed;
	} else if (Keyboard.keyDown === Keys.G) {
		this.currentColor = sprites.cannonGreen;
	} else if (Keyboard.keyDown === Keys.B) {
		this.currentColor = sprites.cannonBlue;
	}

	var opposite = Mouse.position.y - this.position.y;
    var adjacent = Mouse.position.x - this.position.x;
    this.rotation = Math.atan2(opposite, adjacent);
}

cannon.draw = function () {
	Canvas2D.drawImage(sprites.cannonBarrel, cannon.position, cannon.rotation, cannon.origin);
	Canvas2D.drawImage(cannon.currentColor, cannon.colorPosition, 0, {x:16,y:15});
}

var Game = {

};

Game.init = function () {
	document.onmousemove = Mouse.handleMouseMove;
	document.onmousedown = Mouse.handleMouseDown;
	document.onmouseup = Mouse.handleMouseUp;
	document.onkeydown = Keyboard.handleKeyDown;
	Canvas2D.init("gameCanvas");
	sprites.loader();
	cannon.init();
	Game.mainLoop();
}

Game.update = function () {
	cannon.handleInput();
	console.log(Mouse.leftPressed);
}

Game.draw = function () {
	Canvas2D.drawImage(sprites.background, {x:0,y:0}, 0, {x:0,y:0});
	cannon.draw();
}

Game.mainLoop = function () {
	Canvas2D.canvasContext.fillStyle = "#191919";
	Canvas2D.canvasContext.fillRect(0, 0, Canvas2D.canvas.width, Canvas2D.canvas.height);
	Game.update();
	Game.draw();
	Mouse.reset();
	window.setTimeout(Game.mainLoop, 1000/16)
}

// Start the game
document.addEventListener("DOMContentLoaded", Game.init);