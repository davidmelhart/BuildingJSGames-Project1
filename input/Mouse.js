"use strict"

var Mouse = {
	position: {x: 816, y: 10},
	leftDown: false,
	leftPressed: false
};

Mouse.handleMouseMove = function (event) {
	Mouse.position = {x: event.pageX - Canvas2D.canvas.offsetLeft, y: event.pageY - Canvas2D.canvas.offsetTop};
}

Mouse.handleMouseDown = function (event) {
	if (event.which === 1) {
		if (!Mouse.leftDown) {
			Mouse.leftPressed = true;
		}
		Mouse.leftDown = true;
	}
}

Mouse.handleMouseUp = function (event) {
	if (event.which === 1) {
		Mouse.leftDown = false;
	}
}

Mouse.reset = function () {
	Mouse.leftPressed = false;
}

Mouse.init = function () {
	document.onmousemove = Mouse.handleMouseMove;
	document.onmousedown = Mouse.handleMouseDown;
	document.onmouseup = Mouse.handleMouseUp;
}