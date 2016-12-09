"use strict";

function Ball () {
	ThreeColorGameObject.call(this, sprites.ballRed, sprites.ballGreen, sprites.ballBlue);

	this.isShot = false;
	this.speedMultiplier = 1.2;
	this.reset();
}

Ball.prototype = Object.create(ThreeColorGameObject.prototype);

Ball.prototype.reset = function () {
	this.position = new Vector2();
	this.isShot	= false;
};

Ball.prototype.handleInput = function () {
	if (Mouse.leftPressed && !this.isShot) {
		this.isShot = true;
        this.velocity.x = (Mouse.position.x - this.position.x) * this.speedMultiplier;
        this.velocity.y = (Mouse.position.y - this.position.y) * this.speedMultiplier;
	}
};

Ball.prototype.draw = function () {
	if (!this.isShot) {
		return;
	}
	Canvas2D.drawImage(this.currentColor, this.position, this.rotation, this.origin);
};

Ball.prototype.update = function (delta) {
	ThreeColorGameObject.prototype.update.call(this, delta);
	if (this.isShot) {
		this.velocity.x *= 0.99;
		this.velocity.y += 6;
	} else {
		this.color = Game.gameWorld.cannon.color;		
		this.position = Game.gameWorld.cannon.ballPosition.subtractFrom(this.center);
	}

	if (Game.gameWorld.isOutsideWorld(this.position)) {
		this.reset();
	}
};