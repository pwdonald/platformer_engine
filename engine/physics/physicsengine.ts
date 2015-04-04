/// <reference path="../_references.d.ts" />

module Engine.Physics {

    export class Keys {
        up: boolean = false;
        down: boolean = false;
        left: boolean = false;
        right: boolean = false;
    }

    export class PhysicsEngine {
        public keysDown: Keys;

        constructor(public actors: Array<IMoves>, boundaries: Array<Boundary>, public friction: number = 0.8, public gravity: number = 0.3) {
            this.keysDown = new Keys();
        }

        calculateVelocities() {
            var keys = this.keysDown;

            for (var i = 0; i < this.actors.length; i++) {
                var actor = this.actors[i];
                if (actor.controllable) {
                    if (keys.left) {
                        var newVelocity = actor.vx - 1;
                        if (Math.abs(newVelocity) < actor.speed) {
                            actor.vx = newVelocity;
                        }
                    }

                    if (keys.right) {
                        var newVelocity = actor.vx + 1;
                        if (Math.abs(newVelocity) < actor.speed) {
                            actor.vx = newVelocity;
                        }
                    }

                    if (keys.up) {
                        if (!actor.jumping) {
                            actor.vy -= actor.speed * 2;
                            actor.jumping = true;
                            console.log(actor.vy);
                        }
                    }
                }
            }
        }

        moveActors() {
            for (var i = 0; i < this.actors.length; i++) {
                //checkCollisions()
                var actor = this.actors[i];

                actor.dx = actor.x + actor.vx;
                actor.dy = actor.y + actor.vy;

                actor.y = actor.dy;

                if (actor.dx >= 0 && actor.dx <= 640 - actor.width) {
                    actor.x += actor.vx;
                    actor.vx *= this.friction;
                }

                if (actor.y >= 480 - actor.height) {
                    actor.vy = 0;
                    actor.jumping = false;
                    actor.y = 480 - actor.height;
                }
                actor.vy += this.gravity;
            }
        }

        checkCollisions() {

        }
    }
} 