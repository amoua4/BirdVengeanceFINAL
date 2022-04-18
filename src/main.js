/*
Allan Moua
Bird Vengeance
4/18/22
10 hours

Redesign the game's artwork, UI, and sound to change its theme/aesthetic (to something other than sci-fi) (60)
    * bird up
Create a new spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (20)
    * added a faster sprite: motorcyclist
Implement parallax scrolling (10)
    * don't know if I did it right or it would be considered parallax scrolling (see river animation)
Create a new animated sprite for the Spaceship enemies (10)
    * small animation for taxi and motorcyclist
Replace the UI borders with new artwork (10)
    * added a camera border UI
Add your own (copyright-free) background music to the Play scene (5)

*/

let config = {
    type: Phaser.CANVAS, 
    width: 640, 
    height: 480,
    scene:[Menu, Play],
};

let keyF, keyR, keyLeft, keyRight;

let borderUISize = config.height / 15;
let borderPadding = borderUISize / 3;

let game = new Phaser.Game(config);

