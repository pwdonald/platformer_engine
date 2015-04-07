/// <reference path="../_references.d.ts" />
/// <reference path="./baseactor.ts" />

module Engine.Actors {
    export class Player extends BaseActor {

        constructor(x: number, y: number) {
            
            
            var standingActionLeft =
                new ActorAction(
                    new Draw.Sprites.Sprite(<Draw.Sprites.ISpriteOptions>{
                        context: context,
                        frames: 2,
                        height: 12,
                        width: 20,
                        image: 
                    }));

            super(12, 20, playerImage, x, y, 5, true);
        }

    }
} 