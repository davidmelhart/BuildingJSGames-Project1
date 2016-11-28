"use strict";

var ball = {

};

ball.init = function () {
	this.position = { x:0, y:0 };
	this.origin = { x:0, y:0 };
	this.velocity = { x:0, y:0 };
	this.currentColor = sprites.ballRed;
	this.isShot = false;
	this.speedMultiplier = 1.2;
}

ball.reset = function () {
	this.position = { x:0, y:0 };
	this.isShot	= false;
}

ball.handleInput = function () {
	if (Mouse.leftPressed && !ball.isShot) {
		ball.isShot = true;
        this.velocity.x = (Mouse.position.x - this.position.x) * ball.speedMultiplier;
        this.velocity.y = (Mouse.position.y - this.position.y) * ball.speedMultiplier;
	}
}

ball.draw = function () {
	if (!ball.isShot) {
		return;
	}
	Canvas2D.drawImage(ball.currentColor, ball.position, ball.rotation, ball.origin);
}

ball.update = function (delta) {
	if (ball.isShot) {
		ball.velocity.x = ball.velocity.x * 0.99;
		ball.velocity.y = ball.velocity.y + 6;
		ball.position.x = ball.position.x + ball.velocity.x * delta;
		ball.position.y = ball.position.y + ball.velocity.y * delta;
	} else {
		if (cannon.currentColor === sprites.cannonRed) {
			ball.currentColor = sprites.ballRed;
		} else if (cannon.currentColor === sprites.cannonGreen) {
			ball.currentColor = sprites.ballGreen;
		} else {
			ball.currentColor = sprites.ballBlue;
		}
		ball.position = cannon.ballPosition();
		ball.position.x = ball.position.x - ball.currentColor.width / 2;
		ball.position.y = ball.position.y - ball.currentColor.height / 2;
	}

	if (painterGameWorld.isOutsideWorld(ball.position)) {
		ball.reset();
	}
}