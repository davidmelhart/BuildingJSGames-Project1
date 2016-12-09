"use strict";

function ThreeColorGameObject (spriteRed, spriteGreen, spriteBlue) {
	GameObject.call(this);

	this.currentColor = spriteRed;
	this.colorRed = spriteRed;
	this.colorGreen = spriteGreen;
	this.colorBlue = spriteBlue;
}

ThreeColorGameObject.prototype = Object.create(GameObject.prototype);

Object.defineProperty(ThreeColorGameObject.prototype, 'color',
	{
		get: function () {
			if (this.currentColor === this.colorRed) {
				return Color.red;
			} else if (this.currentColor === this.colorGreen) {
				return Color.green;
			} else {
				return Color.blue;
			}
		},
		set: function (value) {
			if (value === Color.red) {
				this.currentColor = this.colorRed;
			} else if (value === Color.green) {
				this.currentColor = this.colorGreen;
			} else if (value === Color.blue) {
				this.currentColor = this.colorBlue;
			}
		}
	});