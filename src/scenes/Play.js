class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    preload() {
        // Assuming 'player' is a spritesheet with frames for running animation
        this.load.spritesheet('player', './assets/PlayerRunning.png', { frameWidth: 32, frameHeight: 64 });
        // Load an image asset to represent the ground
        this.load.image('ground', './assets/Ground.png');
    }

    create() {
        // Create the ground, making it static so it doesn't move
        const ground = this.physics.add.staticGroup();
        this.ladder = new Ladder(this, 200, 300, 'ladder');
        ground.create(400, 568, 'ground').setScale(2).refreshBody();

        // Create the player animations using the loaded spritesheet
        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 4 }),
            frameRate: 5,
            repeat: -1
        });
        
        // Create the player sprite and set physics properties
        this.pixelPlayer = this.physics.add.sprite(100, 450, 'player');
        this.pixelPlayer.setCollideWorldBounds(true);

        // Make the player collide with the ground
        this.physics.add.collider(this.pixelPlayer, ground);

        // Set up cursor keys for input
        this.cursors = this.input.keyboard.createCursorKeys();
        this.pixelPlayer.setCollideWorldBounds(true); 
        this.physics.add.collider(this.pixelPlayer, ground);
    
        // Set the camera's initial position
        this.cameras.main.startFollow(this.pixelPlayer, true, 0.05, 0.05);
        this.cameras.main.setFollowOffset(0, -200);
        this.physics.add.collider(this.pixelPlayer, this.ladder.platform);
    }

    update() {
        // Player movement logic
        if (this.cursors.left.isDown) {
            this.pixelPlayer.setVelocityX(-160);
            this.pixelPlayer.anims.play('run', true);
            this.pixelPlayer.flipX = true; // Flip the sprite to the left
        } else if (this.cursors.right.isDown) {
            this.pixelPlayer.setVelocityX(160);
            this.pixelPlayer.anims.play('run', true);
            this.pixelPlayer.flipX = false; // Use the original sprite orientation
        } else {
            this.pixelPlayer.setVelocityX(0);
            // If you have a 'stand' animation, you could switch to it here
            // this.pixelPlayer.anims.play('stand');
        }


        if (this.cursors.up.isDown && this.pixelPlayer.body.touching.down) {
            this.pixelPlayer.setVelocityY(-330);
        }
    }
    spawnLadder() {
        // Calculate a random x position for the ladder within the game width
        const randomX = Phaser.Math.Between(0, this.scale.width);
        // Spawn a new ladder
        let ladder = new Ladder(this, randomX, this.nextLadderY, 'ladder');
        

        this.nextLadderY -= 200; // Example offset, adjust as needed

        // Handle collisions with the new ladder
        this.physics.add.collider(this.pixelPlayer, ladder.platform);

        this.cleanupLadders();
    }

}

