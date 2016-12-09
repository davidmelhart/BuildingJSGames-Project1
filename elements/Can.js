"use strict";

function Can (positionX, targetColor) {
	ThreeColorGameObject.call(this, sprites.canRed, sprites.canGreen, sprites.canBlue);

	this.targetColor = targetColor;
	this.position = new Vector2(positionX, -200);
	this.reset();
}

Can.prototype = Object.create(ThreeColorGameObject.prototype);

Can.prototype.reset = function () {
	this.moveToTop();
	this.minVelocity = 30;
};

Can.prototype.moveToTop	= function () {
	this.position.y = -200;
	this.currentColor = this.randomColor();
};

Can.prototype.randomVelocity = function () {
	return this.velocity.addTo( new Vector2(0, Math.random()*30 + this.minVelocity ));
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

Can.prototype.update = function (delta) {
	GameObject.prototype.update.call(this, delta);
	this.minVelocity = this.minVelocity + 0.01;

	this.rotation += 50

	if (this.velocity.y === 0 && Math.random() < 0.01) {
		this.velocity = this.randomVelocity();
		this.currentColor = this.randomColor();
	}

	if (Game.gameWorld.isOutsideWorld(this.position)) {
		if (this.color != this.targetColor) {
			Game.gameWorld.lives -= 1;
		}
		this.moveToTop();
	}

	var ball = Game.gameWorld.ball;
	var distance = ball.position.add(ball.center).subtractFrom(this.position).subtractFrom(this.center);

	if (Math.abs(distance.x) < this.center.x && Math.abs(distance.y) < this.center.y) {
		this.color = ball.color;
		ball.reset();
	}
};

Can.prototype.draw = function () {
	Canvas2D.drawImage(this.currentColor, this.position, 0, this.origin);
};
