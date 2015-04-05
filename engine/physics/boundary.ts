module Engine.Physics {
    export class Boundary {
        centerX: number;
        centerY: number;

        constructor(public x: number, public y: number, public width: number, public height: number) {
            this.centerX = (this.x + (width / 2));
            this.centerY = (this.y + (height / 2));
        }

        draw() {
            context.fillStyle = 'black';
            context.rect(this.x, this.y, this.width, this.height);
            context.fill();
        }
    }
} 