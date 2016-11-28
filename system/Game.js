"use strict";

window.requestAnimationFrame =  window.requestAnimationFrame ||
                                window.webkitRequestAnimationFrame ||
                                window.mozRequestAnimationFrame ||
                                window.oRequestAnimationFrame ||
                                window.msRequestAnimationFrame ||
                                function (callback) {
                                    window.setTimeout(callback, 1000 / 60);
                                };

var Game = {
	spritesLoading: 0,
	gameWorld: undefined
};

Game.startup = function (canvas, x, y) {
	Canvas2D.init(canvas);
	Game.size = { x : x, y : y };
	Mouse.init();
	Keyboard.init();
	Game.assetLoader();
	window.requestAnimationFrame(Game.loadingLoop);
}

Game.loadingLoop = function () {
	if (Game.spritesLoading > 0) {
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

}

Game.init = function () {

}

Game.update = function () {
	
}

Game.draw = function () {

}

Game.mainLoop = function () {
	var delta = 1 / 60;

    Game.gameWorld.handleInput(delta);
    Game.gameWorld.update(delta);
    Canvas2D.clear();
    Game.gameWorld.draw();
    Mouse.reset();
    requestAnimationFrame(Game.mainLoop);
}