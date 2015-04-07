/// <reference path="../_references.d.ts" />
/// <reference path="../draw/sprites/sprite.ts" />

module Engine.Actors {
    export class ActorAction {
        constructor(public sprite: Draw.Sprites.Sprite, public action?: string) { }
    }

    export class ActorActions {
        walking_right: ActorAction;
        walking_left: ActorAction;

        running_right: ActorAction;
        running_left: ActorAction;

        standing_left: ActorAction;
        standing_right: ActorAction;

        jumping_left: ActorAction;
        jumping_right: ActorAction;

        misc: Array<ActorAction>;

        constructor(standing_left: ActorAction, standing_right: ActorAction) {
            this.standing_left = standing_left;
            this.standing_right = standing_right;
        }
    }

    export class BaseActor implements Engine.Physics.IMoves {
        x: number;
        y: number;
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
        currentAction: ActorAction;

        constructor(public actions: ActorActions, actorWidth: number, actorHeight: number, x: number, y: number, speed: number, controllable: boolean) {
            this.x = x;
            this.y = y;
            
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
                if (this.jumping || this.vy > 0) {
                    this.currentAction = this.actions.jumping_left;
                }
                this.currentAction = this.actions.walking_left;
            } else if (this.vx > 0) {
                if (this.jumping || this.vy > 0) {
                    this.currentAction = this.actions.jumping_right;
                }
                this.currentAction = this.actions.walking_right;
            }

            this.currentAction.sprite.update(this.x, this.y);
            this.currentAction.sprite.draw();
        }
    }
}