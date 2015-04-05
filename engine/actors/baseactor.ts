/// <reference path="../_references.d.ts" />
/// <reference path="../draw/sprites/sprite.ts" />

module Engine.Actors {
    export class BaseActor extends Draw.Sprites.Sprite implements Engine.Physics.IMoves {
        width: number;
        height: number;
        vx: number = 0;
        vy: number = 0;
        dx: number = 0;
        dy: number = 0;
        speed: number;
        jumping: boolean;
        grounded: boolean = false;
        controllable: boolean = false;
        centerX: number;
        centerY: number;

        constructor(actorWidth:number, actorHeight: number, actorImage: HTMLImageElement, x: number, y: number, speed: number, controllable: boolean) {
            super(<Draw.Sprites.ISpriteOptions> {
                x: x,
                y: y,
                image: actorImage,
                frames: 2,
                startFrame: 0,
                width: actorImage.width,
                height: actorImage.height,
                context: context,
                timePerFrame: FPS
            });

            this.width = actorWidth;
            this.height = actorHeight;
            this.controllable = controllable;
            this.speed = speed;
            this.calculateCenter();
        }

        calculateCenter() {
            this.centerX = (this.x + (this.width / 2));
            this.centerY = (this.y + (this.height / 2));
        }
        
        render() {
            this.calculateCenter();

            if (this.vx < 0) {
                this.facingFront = false;
            } else if (this.vx > 0) {
                this.facingFront = true;
            }

            this.update();
            this.draw();
        }
    }
} 