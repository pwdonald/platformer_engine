declare module Engine.Physics {
    interface IMoves {
        width: number;
        height: number;
        x: number;
        y: number;
        vx: number;
        vy: number;
        dx: number;
        dy: number;
        speed: number;
        jumping: boolean;
        grounded: boolean;
        controllable: boolean;
    }
} 