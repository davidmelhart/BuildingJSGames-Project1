"use strict";

var sprites = {};

Game.assetLoader = function () {
    var loadSprite = function (sprite) {
        return Game.loadSprite("sprites/" + sprite);
    };

    sprites.background = loadSprite("spr_background.jpg");
    sprites.cannonBarrel = loadSprite("spr_cannon_barrel.png");
    sprites.cannonRed = loadSprite("spr_cannon_red.png");
    sprites.cannonGreen = loadSprite("spr_cannon_green.png");
    sprites.cannonBlue = loadSprite("spr_cannon_blue.png");
    sprites.ballRed = loadSprite("spr_ball_red.png");
    sprites.ballGreen = loadSprite("spr_ball_green.png");
    sprites.ballBlue = loadSprite("spr_ball_blue.png");
    sprites.canRed = loadSprite("spr_can_red.png");
    sprites.canGreen = loadSprite("spr_can_green.png");
    sprites.canBlue = loadSprite("spr_can_blue.png");
    sprites.life = loadSprite("spr_lives.png");
    sprites.gameover = loadSprite("spr_gameover_click.png");
};