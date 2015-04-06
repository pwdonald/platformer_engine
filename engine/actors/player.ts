/// <reference path="../_references.d.ts" />
/// <reference path="./baseactor.ts" />

module Engine.Actors {
    export class Player extends BaseActor {

        constructor(x: number, y: number) {
            var playerImage = new Image();
            playerImage.src = 'assets/img/player_standing.png';
            playerImage.width = 25;
            playerImage.height = 20;

            super(12, 20, playerImage, x, y, 5, true);
        }

    }
} 