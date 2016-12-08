"use strict";

function Cannon () {
	this.position = new Vector2(72, 405);
	this.origin = new Vector2(34, 34); //height/2
	this.rotation = 0;
	this.currentColor = sprites.cannonRed;
	this.colorPosition = new Vector2(72, 405)
}

Object.defineProperty(Cannon.prototype, 'center', {
		get: function () {
			return new Vector2(this.currentColor.width/2, this.currentColor.height/2);
		}
	});

Object.defineProperty(Cannon.prototype, 'ballPosition', 
	{
		get: function () {
			var opposite = Math.sin(this.rotation) * sprites.cannonBarrel.width * 0.6;
    		var adjacent = Math.cos(this.rotation) * sprites.cannonBarrel.width * 0.6;
    		return new Vector2(this.position.x + adjacent, this.position.y + opposite);
		}
	});

Object.defineProperty(Cannon.prototype, 'color',
	{
		get: function () {
			if (this.currentColor === sprites.cannonRed) {
				return Color.red;
			} else if (this.currentColor === sprites.cannonGreen) {
				return Color.green;
			} else {
				return Color.blue;
			}
		},
		set: function (value) {
			if (value === Color.red) {
				this.currentColor = sprites.cannonRed;
			} else if (value === Color.green) {
				this.currentColor = sprites.cannonGreen;
			} else if (value === Color.blue) {
				this.currentColor = sprites.cannonBlue;
			}
		}
	});

Cannon.prototype.handleInput = function (delta) {
	if (Keyboard.keyDown === Keys.R) {
		this.color = Color.red;
	} else if (Keyboard.keyDown === Keys.G) {
		this.color = Color.green;
	} else if (Keyboard.keyDown === Keys.B) {
		this.color = Color.blue;
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