/// <reference path="../../_references.d.ts" />
module Draw.Sprites {
    export class Sprite {
        x: number;
        y: number;

        drawContext: CanvasRenderingContext2D;
        image: HTMLImageElement;
        frameCount: number;
        frameIndex: number;
        timePerFrame: number;
        time: number = 0;
        frameWidth: number;
        frameOffsetX: number;
        facingFront = true;

        constructor(options: ISpriteOptions) {
            this.x = options.x;
            this.y = options.y;
            this.drawContext = options.context;
            this.image = options.image;
            this.image.width = this.image.width + 1;
            this.frameCount = options.frames;
            this.frameIndex = options.startFrame || 0;
            this.timePerFrame = options.timePerFrame;
            this.frameWidth = this.image.width / this.frameCount;
        }

        draw(): void {
            this.frameOffsetX = this.frameIndex * this.image.width / this.frameCount;
            this.drawContext.drawImage(this.image, this.frameOffsetX, 0, this.frameWidth, this.image.height, this.x, this.y, this.frameWidth, this.image.height);
        }

        update(): void {
            this.time += 1;

            if (this.time > this.timePerFrame) {
                this.time = 0;

                if (this.frameIndex < this.frameCount - 1) {
                    this.frameIndex++;
                } else {
                    this.frameIndex = 0;
                }
            }
        }
    }
}
