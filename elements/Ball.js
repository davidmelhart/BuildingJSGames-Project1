"use strict";

function Ball () {
	this.position = new Vector2();
	this.origin = new Vector2();
	this.velocity = new Vector2();
	this.currentColor = sprites.ballRed;
	this.isShot = false;
	this.speedMultiplier = 1.2;
}

Object.defineProperty(Ball.prototype, 'center', {
		get: function () {
			return new Vector2(this.currentColor.width/2, this.currentColor.height/2);
		}
	})

Object.defineProperty(Ball.prototype, 'color',
	{
		get: function () {
			if (this.currentColor === sprites.ballRed) {
				return Color.red;
			} else if (this.currentColor === sprites.ballGreen) {
				return Color.green;
			} else {
				return Color.blue;
			}
		},
		set: function (value) {
			if (value === Color.red) {
				this.currentColor = sprites.ballRed;
			} else if (value === Color.green) {
				this.currentColor = sprites.ballGreen;
			} else if (value === Color.blue) {
				this.currentColor = sprites.ballBlue;
			}
		}
	});

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
	if (this.isShot) {
		this.velocity.x = this.velocity.x * 0.99;
		this.velocity.y = this.velocity.y + 6;
		this.position.x = this.position.x + this.velocity.x * delta;
		this.position.y = this.position.y + this.velocity.y * delta;
	} else {

		this.color = Game.gameWorld.cannon.color;		
		this.position = Game.gameWorld.cannon.ballPosition.subtractFrom(this.center);
	}

	if (Game.gameWorld.isOutsideWorld(this.position)) {
		this.reset();
	}
};