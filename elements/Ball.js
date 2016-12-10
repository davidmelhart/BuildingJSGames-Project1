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
		this.velocity = Mouse.position.subtract(this.position).multiplyWith(this.speedMultiplier);
        sounds.shootPaint.play();
	}
};

Ball.prototype.draw = function () {
	if (!this.isShot) {
		return;
	} else {
		GameObject.prototype.draw.call(this)
	}
};

Ball.prototype.update = function (delta) {
	GameObject.prototype.update.call(this, delta);
	
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