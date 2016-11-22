"use strict";

var Game = {
	canvas: undefined,
	canvasContext: undefined,
	mousePosition: {x: 0, y: 0},
	backgroundSprite: undefined,
	cannonBarrelSprite: undefined,
	cannonPosition: {x: 72, y: 405},
	cannonOrigin: {x: 34, y: 34}, //height/2
	cannonRotation: 0
};

Game.init = function () {
	Game.canvas = document.getElementById("gameCanvas");
	Game.canvasContext = Game.canvas.getContext("2d");
	Game.backgroundSprite = new Image();
	Game.backgroundSprite.src = "./sprites/spr_background.jpg"
	Game.cannonBarrelSprite = new Image();
	Game.cannonBarrelSprite.src ="./sprites/spr_cannon_barrel.png"
	Game.mainLoop();
}

document.addEventListener("DOMContentLoaded", Game.init);

Game.update = function () {
	var opposite = Game.mousePosition.y - Game.cannonPosition.y;
	var adjacent = Game.mousePosition.x - Game.cannonPosition.x;
	Game.cannonRotation = Math.atan2(opposite, adjacent);
}

Game.draw = function () {
	Game.drawImage(Game.backgroundSprite, {x:0,y:0}, 0, {x:0,y:0});
	Game.drawImage(Game.cannonBarrelSprite, Game.cannonPosition, Game.cannonRotation, Game.cannonOrigin)
}

Game.mainLoop = function () {
	Game.canvasContext.fillStyle = "#191919";
	Game.canvasContext.fillRect(0, 0, Game.canvas.width, Game.canvas.height);
	Game.update();
	Game.draw();
	window.setTimeout(Game.mainLoop, 1000/16)
}

Game.drawImage = function (sprite, position, rotation, origin) {
	Game.canvasContext.save();
	Game.canvasContext.translate(position.x, position.y);
	Game.canvasContext.rotate(rotation);
	Game.canvasContext.drawImage(sprite, 0, 0, sprite.width, sprite.height, -origin.x, -origin.y, sprite.width, sprite.height);
	Game.canvasContext.restore();
}

function handleMouseMove (event) {
	Game.mousePosition = {x: event.pageX, y: event.pageY};
}

document.onmousemove = handleMouseMove;