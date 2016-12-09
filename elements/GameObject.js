"use strict";

function GameObject () {
	this.origin = Vector2.zero;
	this.position = Vector2.zero;
	this.rotation = 0;
	this.velocity = Vector2.zero;
	this.visible = true
}

GameObject.prototype.draw = function () {
	if (!this.visible) {
		return;
	} else {
		Canvas2D.drawImage(this.currentColor, this.position, this.rotation, this.origin)
	}
};

GameObject.prototype.update = function (delta) {
	this.position.addTo(this.velocity.multiply(delta));
};

Object.defineProperty(GameObject.prototype, 'center', {
		get: function () {
			return new Vector2(this.currentColor.width/2, this.currentColor.height/2);
		}
	});

Object.defineProperty(GameObject.prototype, "width",
    {
        get: function () {
            return this.currentColor.width;
        }
    });

Object.defineProperty(GameObject.prototype, "height",
    {
        get: function () {
            return this.currentColor.height;
        }
    });

Object.defineProperty(GameObject.prototype, "size",
    {
        get: function () {
            return new Vector2(this.currentColor.width, this.currentColor.height);
        }
    });