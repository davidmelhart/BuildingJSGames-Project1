"use strict";

function Can (position) {
	this.currentColor = sprites.canRed;
	this.velocity = new Vector2();
	this.position = new Vector2(position, -200);
	this.origin = new Vector2();
	this.reset();
}

Can.prototype.reset = function () {
	this.moveToTop();
	this.minVelocity = 30;
};

Can.prototype.randomVelocity = function () {
	return { x: 0, y: Math.random()*30 + this.minVelocity };
};

Can.prototype.randomColor = function () {
	var random = Math.floor(Math.random()*3);

	if (random === 0) {
		return sprites.canRed;
	} else if (random === 1) {
		return sprites.canGreen;
	} else {
		return sprites.canBlue;
	}
};

Can.prototype.update = function () {
	if (this.velocity.y === 0 && Math.random() < 0.01) {
		this.velocity = this.randomVelocity();
		this.currentColor = this.randomColor();
	}

	this.position.x = this.position.x + this.velocity.x * delta;
	this.position.y = this.position.y + this.velocity.y * delta;

	if (Game.gameWorld.isOutsideWorld(this.position)) {
		this.moveToTop();
	}

	this.minVelocity = minVelocity + 0.01;
};