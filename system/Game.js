"use strict";

window.requestAnimationFrame =  window.requestAnimationFrame ||
                                window.webkitRequestAnimationFrame ||
                                window.mozRequestAnimationFrame ||
                                window.oRequestAnimationFrame ||
                                window.msRequestAnimationFrame ||
                                function (callback) {
                                    window.setTimeout(callback, 1000 / 60);
                                };

function Game_Singleton () {
	this.size = undefined;
	this.gameWorld = undefined;
	this.spritesLoading = 0;
}

Game_Singleton.prototype.startup = function (canvas, x, y) {
	Canvas2D.init(canvas);
	this.size = { x : x, y : y };
	this.assetLoader();
	this.loadingLoop();
	//window.requestAnimationFrame(this.loadingLoop);
};

Game_Singleton.prototype.init = function () {
	
};

Game_Singleton.prototype.assetLoader = function () {

};

Game_Singleton.prototype.loadSprite = function(imageName) {
	var image = new Image();
	image.src = imageName;
	this.spritesLoading += 1;
	image.onload = function () {
		Game.spritesLoading -=1;
	}
	return image;
};

Game_Singleton.prototype.loadingLoop = function () {
	if (!this.spritesLoading > 0)
        requestAnimationFrame(Game.loadingLoop);
    else {
        Game.init();
        requestAnimationFrame(Game.mainLoop);
    }
};

Game_Singleton.prototype.mainLoop = function () {
	var delta = 1 / 60;

    Game.gameWorld.handleInput(delta);
    Game.gameWorld.update(delta);
    Canvas2D.clear();
    Game.gameWorld.draw();
    Mouse.reset();
    requestAnimationFrame(Game.mainLoop);
};

var Game = new Game_Singleton();