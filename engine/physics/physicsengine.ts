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

        constructor(public actors: Array<IMoves>, public boundaries: Array<Boundary>, public friction: number = 0.8, public gravity: number = 0.3) {
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
                        if (!actor.jumping && actor.grounded) {
                            actor.vy -= actor.speed * 2;
                            actor.jumping = true;
                            actor.grounded = false;
                        }
                    }
                }
            }
        }

        moveActors() {
            for (var i = 0; i < this.actors.length; i++) {
                var actor = this.actors[i];

                actor.vx *= this.friction;
                actor.vy += this.gravity;

                actor.grounded = false;

                for (var j = 0; j < this.boundaries.length; j++) {
                    var boundary = this.boundaries[j];

                    var collisionDirection = this.checkCollisionsDirection(actor, boundary);

                    if (collisionDirection === 'left' || collisionDirection === 'right') {
                        actor.vx = 0;
                        actor.jumping = false;
                    } else if (collisionDirection === 'bottom') {
                        actor.grounded = true;
                        actor.jumping = false;
                    } else if (collisionDirection === 'top') {
                        actor.vy *= -1;
                    }
                }

                if (actor.grounded) {
                    actor.vy = 0;
                }

                actor.y = actor.y + actor.vy;
                actor.x = actor.x + actor.vx;
            }
        }

        checkCollisionsDirection(subject1: IMoves, subject2: IMoves | Boundary): string {
            // If no collision an empty string will be returned.
            var collisionDirection = '';

            // create a vector from the center of subject1 to the center of subject2
            var vectorX = subject1.centerX - subject2.centerX,
                vectorY = subject1.centerY - subject2.centerY;

            // calculate how close the objects can be before they overlap
            var maxProximityWidth = (subject1.width / 2) + (subject2.width / 2),
                maxProximityHeight = (subject1.height / 2) + (subject2.height / 2);

            // detect a collision
            if (Math.abs(vectorX) < maxProximityWidth && Math.abs(vectorY) < maxProximityHeight) {
                // calculate the direction of collision
                var collisionY = maxProximityHeight - Math.abs(vectorY),
                    collisionX = maxProximityWidth - Math.abs(vectorX);

                // figure out which side the objects collided
                if (collisionX >= collisionY) {
                    if (vectorY > 0) {
                        collisionDirection = 'top';
                        subject1.y += collisionY;
                    } else {
                        collisionDirection = 'bottom';
                        subject1.y -= collisionY;
                    }
                } else {
                    if (vectorX > 0) {
                        collisionDirection = 'left';
                        subject1.x += collisionX;
                    } else {
                        collisionDirection = 'right';
                        subject1.x -= collisionX;
                    }
                }
            }
            return collisionDirection;
        }
    }
} 