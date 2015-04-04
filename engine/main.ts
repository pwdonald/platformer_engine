﻿/// <reference path="_references.d.ts" />
/// <reference path="actors/player.ts" />

var FPS = 60,
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    player: Engine.Actors.Player,
    physicsEngine: Engine.Physics.PhysicsEngine;

var initialize = () => {
    canvas = <HTMLCanvasElement>document.getElementById('screen');
    context = canvas.getContext('2d');
    player = new Engine.Actors.Player(canvas.width / 2, canvas.height / 2);
    physicsEngine = new Engine.Physics.PhysicsEngine([player], []);

    canvas.width = 640;
    canvas.height = 480;

    renderLoop();
}

var renderLoop = () => {
    window.requestAnimationFrame(renderLoop);
    context.clearRect(0, 0, canvas.width, canvas.height);
    physicsEngine.calculateVelocities();
    physicsEngine.moveActors();
    player.render();
};

window.addEventListener('keydown', function (e) {
    switch (e.keyCode) {
        case 37:
            physicsEngine.keysDown.left = true;
            break;
        case 38:
            physicsEngine.keysDown.up = true;
            break;
        case 39:
            physicsEngine.keysDown.right = true;
            break;
        case 40:
            physicsEngine.keysDown.down = true;
            break;
        default:
            break;
    }
});

window.addEventListener('keyup', function (e) {
    switch (e.keyCode) {
        case 37:
            physicsEngine.keysDown.left = false;
            break;
        case 38:
            physicsEngine.keysDown.up = false;
            break;
        case 39:
            physicsEngine.keysDown.right = false;
            break;
        case 40:
            physicsEngine.keysDown.down = false;
            break;
        default:
            break;
    }
});

initialize();