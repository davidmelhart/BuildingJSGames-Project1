"use strict";

function PainterGameWorld () {
    this.cannon = new Cannon();
    this.ball = new Ball();

    this.can1 = new Can(450);
    this.can2 = new Can(575);
    this.can3 = new Can(700);
}

PainterGameWorld.prototype.handleInput = function (delta) {
    this.ball.handleInput(delta);
    this.cannon.handleInput(delta);
};

PainterGameWorld.prototype.update = function (delta) {
    this.ball.update(delta);
    this.cannon.update(delta);
};

PainterGameWorld.prototype.draw = function () {
    Canvas2D.drawImage(sprites.background, { x : 0, y : 0 }, 0, { x : 0, y : 0 });
    this.ball.draw();
    this.cannon.draw();
    this.can1.draw();
    this.can2.draw();
    this.can3.draw();
};

PainterGameWorld.prototype.reset = function () {
    this.ball.reset();
    this.cannon.reset();
};

PainterGameWorld.prototype.isOutsideWorld = function (position) {
    return position.x < 0 || position.x > Game.size.x || position.y > Game.size.y;
};