"use strict";

function Cannon () {
	this.position = {x: 72, y: 405};
	this.origin = {x: 34, y: 34}; //height/2
	this.rotation = 0;
	this.currentColor = sprites.cannonRed;
	this.colorPosition = {x: 72, y: 405};
}

Cannon.prototype.handleInput = function (delta) {
	if (Keyboard.keyDown === Keys.R) {
		this.currentColor = sprites.cannonRed;
	} else if (Keyboard.keyDown === Keys.G) {
		this.currentColor = sprites.cannonGreen;
	} else if (Keyboard.keyDown === Keys.B) {
		this.currentColor = sprites.cannonBlue;
	}

	var opposite = Mouse.position.y - this.position.y;
    var adjacent = Mouse.position.x - this.position.x;
    this.rotation = Math.atan2(opposite, adjacent);
};

Cannon.prototype.draw = function () {
	Canvas2D.drawImage(sprites.cannonBarrel, this.position, this.rotation, this.origin);
	Canvas2D.drawImage(this.currentColor, this.colorPosition, 0, {x:16,y:15});
};

Cannon.prototype.update = function (delta) {
	
};

Cannon.prototype.reset = function () {
    this.position = new Vector2(72, 405);
};

Cannon.prototype.ballPosition = function () {
	var opposite = Math.sin(this.rotation) * sprites.cannonBarrel.width * 0.6;
    var adjacent = Math.cos(this.rotation) * sprites.cannonBarrel.width * 0.6;
    return { x: this.position.x + adjacent, y: this.position.y + opposite}
};