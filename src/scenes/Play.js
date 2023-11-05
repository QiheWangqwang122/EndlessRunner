class Play extends Phaser.Scene {
    constructor() {
        super('playScene'); // 'Play' is the identifier for this scene
    }

    preload() {
        // Load the player spritesheet where each frame is, for example, 32 pixels by 48 pixels.
        this.load.spritesheet('player', './assets/PlayerRunning.png', { frameWidth: 48, frameHeight: 32 ,startFrame: 0, endFrame: 4});
        this.load.image('ground', './assets/Ground.png');
        //this.physics.startSystem(Phaser.Physics.ARCADE)
    }

    create() {
        const ground = this.physics.add.staticGroup();
        //this.physics.add.staticGroup();
        
        ground.create(400, 568, 'ground').setScale(2).refreshBody();
        
        // Create the player sprite at position (100, 450)
        // Make the player collide with the ground
        
        // Create the animation for standing, assuming the first frame (index 0) is for standing

        this.keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        
        this.pixelPlayer = this.physics.add.existing(new PixelPlayer(this, 400, 450, 'player', {
            keyLeft: this.keyLeft,
            keyRight: this.keyRight,
            keyUP: this.keyUP
        }).setOrigin(0.5,0.5));
        this.pixelPlayer.setCollideWorldBounds(true); 
        this.physics.add.collider(this.pixelPlayer, ground);

        
    }

    update() {
        this.pixelPlayer.update();
    }

    
}


