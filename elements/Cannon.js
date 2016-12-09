"use strict";

function Cannon () {
	ThreeColorGameObject.call(this, sprites.cannonRed, sprites.cannonGreen, sprites.cannonBlue);

	this.position = new Vector2(72, 405);
	this.origin = new Vector2(34, 34);
}

Cannon.prototype = Object.create(ThreeColorGameObject.prototype);

Object.defineProperty(Cannon.prototype, 'ballPosition', 
	{
		get: function () {
			var opposite = Math.sin(this.rotation) * sprites.cannonBarrel.width * 0.6;
    		var adjacent = Math.cos(this.rotation) * sprites.cannonBarrel.width * 0.6;
    		return new Vector2(this.position.x + adjacent, this.position.y + opposite);
		}
	});

Cannon.prototype.handleInput = function (delta) {
	if (Keyboard.keyDown === Keys.R) {
		this.currentColor = this.colorRed;
	} else if (Keyboard.keyDown === Keys.G) {
		this.currentColor = this.colorGreen;
	} else if (Keyboard.keyDown === Keys.B) {
		this.currentColor = this.colorBlue;
	}

	var opposite = Mouse.position.y - this.position.y;
    var adjacent = Mouse.position.x - this.position.x;
    this.rotation = Math.atan2(opposite, adjacent);
};

Cannon.prototype.draw = function () {
		if (!this.visible) {
		return;
	} else {
		var colorPosition = this.position.subtract(this.size.divideBy(2));
    	Canvas2D.drawImage(sprites.cannonBarrel, this.position, this.rotation, this.origin);
    	Canvas2D.drawImage(this.currentColor, colorPosition);
	}
};

Cannon.prototype.reset = function () {
    this.position = new Vector2(72, 405);
};