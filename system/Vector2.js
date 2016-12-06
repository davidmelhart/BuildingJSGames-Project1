"use strict";

function Vector2 (x,y) {
	if (typeof x === "undefined") {
		this.x = 0;
	} else {
		this.x = x;
	}
	
	if (typeof y === "undefined") {
		this.y = 0;
	} else {
		this.y = y;
	}
}