declare module Draw.Sprites {
    interface ISpriteOptions {
        x: number;
        y: number;
        context: CanvasRenderingContext2D;
        width: number;
        height: number;
        image: HTMLImageElement;
        frames: number;
        timePerFrame: number;
        startFrame: number;
    }
}