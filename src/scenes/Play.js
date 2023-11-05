class Play extends Phaser.Scene {
    constructor() {
        super('playScene'); // 'Play' is the identifier for this scene
    }

    preload() {
        // Load the player spritesheet where each frame is, for example, 32 pixels by 48 pixels.
        this.load.spritesheet('player', './assets/PlayerRunning.png', { frameWidth: 32, frameHeight: 48 ,startFrame: 0, endFrame: 4});
        this.load.image('ground', './assets/Ground.png');
    }

    create() {
        const ground = this.physics.add.staticGroup();

        // Create the ground sprite at position (400, 568)
        ground.create(400, 568, 'ground').setScale(2).refreshBody();
        
        // Create the player sprite at position (100, 450)
        // Make the player collide with the ground
        this.physics.add.collider(this.pixelPlayer, ground);
        // Create the animation for standing, assuming the first frame (index 0) is for standing

        this.keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.pixelPlayer = new Pixelplayer(this, 100, 450, 'player', {
            keyLeft: this.keyLeft,
            keyRight: this.keyRight,
            keyUP: this.keyUP
          });
        this.pixelPlayer.setBounce(0.2);
        this.pixelPlayer.setCollideWorldBounds(true);

        //this.pixelPlayer.anims.play('stand');

        
    }

    update() {
        this.pixelPlayer.update();
    }

    
}


