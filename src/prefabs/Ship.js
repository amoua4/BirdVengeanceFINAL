class Ship extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        this.points = 1;
        this.moveSpeed = game.settings.shipSpeed;
    }

    update() {
        this.x -= this.moveSpeed;
        if(this.x < 0){
            this.x = game.config.width;
        }
    }

    reset() {
        this.x = game.config.width;
    }

}