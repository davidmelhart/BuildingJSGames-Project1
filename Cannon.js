"use strict"

var cannon = {

};

cannon.init = function () {
	this.position = {x: 72, y: 405};
	this.origin = {x: 34, y: 34}; //height/2
	this.rotation = 0;
	this.currentColor = sprites.cannonRed;
	this.colorPosition = {x: 72, y: 405};
}

cannon.handleInput = function () {
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
}

cannon.draw = function () {
	Canvas2D.drawImage(sprites.cannonBarrel, cannon.position, cannon.rotation, cannon.origin);
	Canvas2D.drawImage(cannon.currentColor, cannon.colorPosition, 0, {x:16,y:15});
}