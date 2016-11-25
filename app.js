"use strict";

var sprites = {};

window.requestAnimationFrame =  window.requestAnimationFrame ||
                                window.webkitRequestAnimationFrame ||
                                window.mozRequestAnimationFrame ||
                                window.oRequestAnimationFrame ||
                                window.msRequestAnimationFrame ||
                                function (callback) {
                                    window.setTimeout(callback, 1000 / 60);
                                };

var Game = {
	spritesLoading: 0
};

Game.startup = function (canvas) {
	Canvas2D.init(canvas);
	Mouse.init();
	Keyboard.init();
	Game.assetLoader();
	window.requestAnimationFrame(Game.loadingLoop);
}

Game.loadingLoop = function () {
	if (Game.spritesLoading > 0) {
		console.log(loading)
		window.requestAnimationFrame(Game.loadingLoop);
	} else {
		Game.init();
		Game.mainLoop();
	}
}

Game.loadSprite = function(imageName) {
	var image = new Image();
	image.src = imageName;
	Game.spritesLoading += 1;
	image.onload = function () {
		Game.spritesLoading -=1;
	}
	return image;
}

Game.assetLoader = function () {
	var spritesFolder = "./sprites/";
	sprites.background = Game.loadSprite(spritesFolder + "spr_background.jpg");
	sprites.cannonBarrel = Game.loadSprite(spritesFolder + "spr_cannon_barrel.png");
	sprites.cannonRed = Game.loadSprite(spritesFolder + "spr_cannon_red.png");
	sprites.cannonGreen = Game.loadSprite(spritesFolder + "spr_cannon_green.png");
	sprites.cannonBlue = Game.loadSprite(spritesFolder + "spr_cannon_blue.png");
}

Game.init = function () {
	cannon.init();
}

Game.update = function () {
	cannon.handleInput();
}

Game.draw = function () {
	Canvas2D.clear();
	Canvas2D.drawImage(sprites.background, {x:0,y:0}, 0, {x:0,y:0});
	cannon.draw();
}

Game.mainLoop = function () {
	Canvas2D.canvasContext.fillStyle = "#191919";
	Canvas2D.canvasContext.fillRect(0, 0, Canvas2D.canvas.width, Canvas2D.canvas.height);
	Game.update();
	Game.draw();
	Mouse.reset();
	window.requestAnimationFrame(Game.mainLoop)
}