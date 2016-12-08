"use strict";

function Can (positionX) {
	this.currentColor = sprites.canRed;
	this.velocity = new Vector2();
	this.position = new Vector2(positionX, -200);
	this.origin = new Vector2();
	this.reset();
}

Object.defineProperty(Can.prototype, 'center', {
		get: function () {
			return new Vector2(this.currentColor.width/2, this.currentColor.height/2);
		}
	});

Object.defineProperty(Can.prototype, 'color',
	{
		get: function () {
			if (this.currentColor === sprites.canRed) {
				return Color.red;
			} else if (this.currentColor === sprites.canGreen) {
				return Color.green;
			} else {
				return Color.blue;
			}
		},
		set: function (value) {
			if (value === Color.red) {
				this.currentColor = sprites.canRed;
			} else if (value === Color.green) {
				this.currentColor = sprites.canGreen;
			} else if (value === Color.blue) {
				this.currentColor = sprites.canBlue;
			}
		}
	});

Can.prototype.reset = function () {
	this.moveToTop();
	this.minVelocity = 30;
};

Can.prototype.moveToTop	= function () {
	this.position.y = -200;
	this.currentColor = this.randomColor();
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

Can.prototype.update = function (delta) {
	if (this.velocity.y === 0 && Math.random() < 0.01) {
		this.velocity = this.randomVelocity();
		this.currentColor = this.randomColor();
	}

	this.position.x = this.position.x + this.velocity.x * delta;
	this.position.y = this.position.y + this.velocity.y * delta;

	if (Game.gameWorld.isOutsideWorld(this.position)) {
		this.moveToTop();
	}

	this.minVelocity = this.minVelocity + 0.01;

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
