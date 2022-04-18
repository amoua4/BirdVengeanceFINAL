class Menu extends Phaser.Scene {
    constructor(){
        super("menu");
    }

    preload() {
        //load audio
        this.load.audio('sfx_select', './assets/birdcall.wav');
        this.load.audio('sfx_explosion', './assets/carexplosion.wav');
        this.load.audio('sfx_rocket', './assets/birdsquawk.mp3');
        this.load.audio('soundtrack', './assets/soundtrack.mp3');
    }

    create() {
        let menuConfig = {
            fontFamily: 'Arial',
            fontSize: '60px',
            fontStyle: 'bold',
            backgroundColor: '#000000',
            color: '#FFFFFF',
            align: 'right',
            padding: {
                top:5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        //show menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'BIRD VENGEANCE', menuConfig).setOrigin(0.5);
        menuConfig.fontSize = '18px';
        this.add.text(game.config.width/2, game.config.height/2, 'Use ← → arrows to move & (F) to enact bird justice', menuConfig).setOrigin(0.5,-1.5);
        menuConfig.fontStyle = 'bold';
        menuConfig.backgroundColor = '#fbf236';
        menuConfig.fontSize = '22px';
        menuConfig.color = '#000000';

        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press ← for Novice or → for Expert', menuConfig).setOrigin(0.5,-1.6);
        
        keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLeft)){
            //easy
            game.settings = {
                shipSpeed: 3,
                motorSpeed: 4,
                gameTimer: 60000
            }
            this.sound.play('sfx_select');
            this.scene.start('play');
        }

        if (Phaser.Input.Keyboard.JustDown(keyRight)){
            //hard
            game.settings = {
                shipSpeed: 4,
                motorSpeed: 5,
                gameTimer: 45000
            }
            this.sound.play('sfx_select');
            this.scene.start('play');
        }
    }
}