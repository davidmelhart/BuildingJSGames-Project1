"use strict";

function Ball () {
	this.position = { x:0, y:0 };
	this.origin = { x:0, y:0 };
	this.velocity = { x:0, y:0 };
	this.currentColor = sprites.ballRed;
	this.isShot = false;
	this.speedMultiplier = 1.2;
}

Ball.prototype.reset = function () {
	this.position = { x:0, y:0 };
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
	if (this.isShot) {
		this.velocity.x = this.velocity.x * 0.99;
		this.velocity.y = this.velocity.y + 6;
		this.position.x = this.position.x + this.velocity.x * delta;
		this.position.y = this.position.y + this.velocity.y * delta;
	} else {
		if (Game.gameWorld.cannon.currentColor === sprites.cannonRed) {
			this.currentColor = sprites.ballRed;
		} else if (Game.gameWorld.cannon.currentColor === sprites.cannonGreen) {
			this.currentColor = sprites.ballGreen;
		} else {
			this.currentColor = sprites.ballBlue;
		}
		this.position = Game.gameWorld.cannon.ballPosition();
		this.position.x = this.position.x - this.currentColor.width / 2;
		this.position.y = this.position.y - this.currentColor.height / 2;
	}

	if (Game.gameWorld.isOutsideWorld(this.position)) {
		this.reset();
	}
};