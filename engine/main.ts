/// <reference path="draw/sprites/sprite.ts" />

/// <reference path="_references.d.ts" />

var FPS = 60,
    canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('screen'),
    context: CanvasRenderingContext2D = canvas.getContext('2d'),
    playerImage = new Image();

playerImage.src = 'assets/img/player_standing.png';

var playerSprite = new Draw.Sprites.Sprite(<Draw.Sprites.ISpriteOptions> {
    x: canvas.width / 2,
    y: canvas.height / 2,
    image: playerImage,
    frames: 2,
    startFrame: 0,
    width: 25,
    height: 20,
    context: context,
    timePerFrame: FPS
});

var renderLoop = function () {
    window.requestAnimationFrame(renderLoop);
    context.clearRect(0, 0, canvas.width, canvas.height);
    playerSprite.update();
    playerSprite.draw();
};

canvas.width = 640;
canvas.height = 480;

renderLoop();