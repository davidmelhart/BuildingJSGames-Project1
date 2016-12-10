"use strict";

function PainterGameWorld () {
    this.cannon = new Cannon();
    this.ball = new Ball();

    this.can1 = new Can(451, Color.red);
    this.can2 = new Can(580, Color.green);
    this.can3 = new Can(704, Color.blue);

    this.lives = 5;
    this.score = 0;
}

PainterGameWorld.prototype.handleInput = function (delta) {
    if (this.lives > 0) {
        this.ball.handleInput(delta);
        this.cannon.handleInput(delta);
    } else {
        if (Mouse.leftPressed) {
            this.reset();
            sounds.music.volume = 0.3;
            sounds.music.play();
        }
    }

};

PainterGameWorld.prototype.update = function (delta) {
    if (this.lives <= 0) {
        return;
    } else {
        this.ball.update(delta);
        this.cannon.update(delta);
        this.can1.update(delta);
        this.can2.update(delta);
        this.can3.update(delta);
    }
};

PainterGameWorld.prototype.draw = function () {
    Canvas2D.drawImage(sprites.background);
    this.ball.draw();
    this.cannon.draw();
    this.can1.draw();
    this.can2.draw();
    this.can3.draw();
    if (this.lives > 0) {
        Canvas2D.drawImage(sprites.crosshair, Mouse.position, 0, new Vector2(sprites.crosshair.width, sprites.crosshair.height).divideBy(2))
    }

    for (var i = 0; i < this.lives; i++) {
        Canvas2D.drawImage(sprites.life, new Vector2(i * sprites.life.width + 15, 60));
    }

    Canvas2D.drawImage(sprites.score, new Vector2(12,12));
    Canvas2D.drawText("Score: " + this.score, new Vector2(22,21))

    if (this.lives <= 0) {
        Canvas2D.fill("rgba(0, 0, 0, 0.8)")
        Canvas2D.drawImage(sprites.gameover, new Vector2(Game.size.x - sprites.gameover.width, Game.size.y - sprites.gameover.height).divideBy(2))
        sounds.music.volume = 0;
    }
};

PainterGameWorld.prototype.reset = function () {
    this.lives = 5;
    this.ball.reset();
    this.cannon.reset();
    this.can1.reset();
    this.can2.reset();
    this.can3.reset();
};

PainterGameWorld.prototype.isOutsideWorld = function (position) {
    return position.x < 0 || position.x > Game.size.x || position.y > Game.size.y;
};