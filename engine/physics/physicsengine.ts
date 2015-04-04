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

        constructor(public actors: Array<IMoves>, boundaries: Array<Boundary>) {
            this.keysDown = new Keys();
        }

        calculateVelocities() {
            var keys = this.keysDown;

            for (var i = 0; i < this.actors.length; i++) {
                var actor = this.actors[i];

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
            }
        }

        moveActors() {
            for (var i = 0; i < this.actors.length; i++) {
                //checkCollisions()
                var actor = this.actors[i];

                actor.dx = actor.x + actor.vx;
                actor.dy = actor.y + actor.vy;

                if (actor.dx >= 0 && actor.dx <= 640 - actor.width) {
                    actor.x += actor.vx;
                }

                if (actor.dy >= 0 && actor.dy <= 480 - actor.height) {
                    actor.y += actor.vy;
                }
            }
        }

        checkCollisions() {

        }
    }
} 