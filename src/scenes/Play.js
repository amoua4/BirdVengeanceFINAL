class Play extends Phaser.Scene {
    constructor() {
        super("play");
    }

    preload() {
        this.load.image('starfield', 'assets/road.png');
        this.load.image('river', 'assets/river.png');
        this.load.image('riverstream', 'assets/riverstream.png');
        this.load.image('fish', 'assets/fish.png');
        this.load.image('rocket', 'assets/bird.png');
        this.load.spritesheet('ship', 'assets/taxi.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 3});
        this.load.spritesheet('explosion', 'assets/explosion2.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
        this.load.spritesheet('border', 'assets/UIborder.png', {frameWidth: 640, frameHeight: 480, startFrame: 0, endFrame: 11});
        this.load.spritesheet('motorcycle', 'assets/motorcycle.png', {frameWidth: 32, frameHeight: 24, startFrame: 0, endFrame: 3});
    }

    create() {
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        this.starfield = this.add.tileSprite(0,0, game.config.width, game.config.height, 'starfield').setOrigin(0,0);
        this.river = this.add.tileSprite(0,0, game.config.width, 100, 'river').setOrigin(0,0);
        this.river2 = this.add.tileSprite(0,420, game.config.width, 100, 'river').setOrigin(0,0);
        this.fish = this.add.tileSprite(0,0, game.config.width, 100, 'fish').setOrigin(0,0);
        this.fish2 = this.add.tileSprite(0,420, game.config.width, 100, 'fish').setOrigin(0,0);
        this.riverstream = this.add.tileSprite(0,0, game.config.width, 100, 'riverstream').setOrigin(0,0);
        this.riverstream2 = this.add.tileSprite(0,420, game.config.width, 100, 'riverstream').setOrigin(0,0);
       
        //soundtrack
        this.soundtrack = this.sound.play('soundtrack', {loop: true, volume: 0.4});

        this.p1Rocket = new Rocket(this, game.config.width/2, 431, 'rocket').setOrigin(0.5,0);
        this.p1Rocket.reset();

        this.anims.create({
            key: 'motorbike',
            frames: this.anims.generateFrameNumbers('motorcycle', {start: 0, end: 3, first: 0}),
            frameRate:6,
            repeat:-1
        })

        this.anims.create({
            key: 'taxi',
            frames: this.anims.generateFrameNumbers('ship', {start: 0, end: 3, first: 0}),
            frameRate:6,
            repeat:-1
        })

        this.bike = new Motorcycle(this, 600, 145,'motorcycle');
        this.ShipA = new Ship(this, 300, 300, 'ship');
        this.ShipB = new Ship(this, 400, 175, 'ship');
        this.ShipC = new Ship(this, 100, 225, 'ship');

        this.ShipA.anims.play('taxi');
        this.ShipB.anims.play('taxi');
        this.ShipC.anims.play('taxi');
        this.bike.anims.play('motorbike');

        //animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 9, first: 0}),
            frameRate:15
        })

        this.anims.create({
            key: 'UIborder',
            frames: this.anims.generateFrameNumbers('border', {start: 0, end: 7, first: 0}),
            frameRate:3,
            repeat: -1
        })

        let recBorder = this.add.sprite(0, 0, 'border').setOrigin(0,0);
        recBorder.anims.play('UIborder');
        

        //init score
        this.p1Score = 0;

        //display score
        let scoreConfig = {
            fontFamily: 'Arial',
            fontSize: '28px',
            backgroundColor: '#FFFFFF',
            color: '#000000',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 50
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding * 2, this.p1Score, scoreConfig);

        //GAME OVER FLAG
        this.gameOver = false;

        //game timer
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAMER OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
            this.game.sound.stopAll();
        }, null, this);
    }

    update() {
        //check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)){
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLeft)){
            this.scene.start('menu');
        }

        //tile sprite motion
        this.starfield.tilePositionX -= 2; 
        this.river.tilePositionX -= 0.5; 
        this.river2.tilePositionX -= 0.5; 
        this.fish.tilePositionX -= 0.3; 
        this.riverstream.tilePositionX -= 0.6; 
        this.fish2.tilePositionX -= 0.2; 
        this.riverstream2.tilePositionX -= 0.6; 

        if (!this.gameOver){
        this.p1Rocket.update();
        this.ShipA.update();
        this.ShipB.update();
        this.ShipC.update();
        this.bike.update();
        }

        //collision check
        if(this.checkCollision(this.p1Rocket, this.ShipA)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ShipA);
        }

        if(this.checkCollision(this.p1Rocket, this.ShipB)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ShipB);
        }

        if(this.checkCollision(this.p1Rocket, this.ShipC)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ShipC);
        }
        
        if(this.checkCollision(this.p1Rocket, this.bike)) {
            this.p1Rocket.reset();
            this.shipExplode(this.bike);
        }
    }

    checkCollision(rocket, ship) {
        if (rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y) {
                return true;
        } else {
            return false;
        }
    }

    shipExplode(ship) {
        ship.alpha = 0;
        // create explosion at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0.55,0.5);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        });
        
        //score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        //sound FX
        this.sound.play('sfx_explosion');
    }
}