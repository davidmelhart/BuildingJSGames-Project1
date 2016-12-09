"use strict";

function ThreeColorGameObject (spriteRed, spriteGreen, spriteBlue) {
	this.origin = Vector2.zero;
	this.position = Vector2.zero;
	this.rotation = 0;
	this.velocity = Vector2.zero;
	this.currentColor = spriteRed;
	this.colorRed = spriteRed;
	this.colorGreen = spriteGreen;
	this.colorBlue = spriteBlue;
	this.visible = true
}

ThreeColorGameObject.prototype.draw = function () {
	if (!this.visible) {
		return;
	} else {
		Canvas2D.drawImage(this.currentColor, this.position, this.rotation, this.origin)
	}
};

ThreeColorGameObject.prototype.update = function (delta) {
	this.position.addTo(this.velocity.multiply(delta));
};

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

Object.defineProperty(ThreeColorGameObject.prototype, 'center', {
		get: function () {
			return new Vector2(this.currentColor.width/2, this.currentColor.height/2);
		}
	});

Object.defineProperty(ThreeColorGameObject.prototype, "width",
    {
        get: function () {
            return this.currentColor.width;
        }
    });

Object.defineProperty(ThreeColorGameObject.prototype, "height",
    {
        get: function () {
            return this.currentColor.height;
        }
    });

Object.defineProperty(ThreeColorGameObject.prototype, "size",
    {
        get: function () {
            return new Vector2(this.currentColor.width, this.currentColor.height);
        }
    });