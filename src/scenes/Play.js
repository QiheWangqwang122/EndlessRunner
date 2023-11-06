class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    preload() {
        // Assuming 'player' is a spritesheet with frames for running animation
        this.load.spritesheet('player', './assets/PlayerRunning.png', { frameWidth: 32, frameHeight: 64 });
        // Load an image asset to represent the ground
        this.load.image('ground', './assets/Ground.png');
        this.load.image('ladder', './assets/ladder.png');
        this.load.image('star', './assets/stars.png');
        this.load.image('cloud','./assets/cloud.png');
        
    }

    create() {
        // Create the ground, making it static so it doesn't move
        const ground = this.physics.add.staticGroup();
        this.ladder = new Ladder(this, 200, 300, 'ladder');
        ground.create(400, 568, 'ground').setScale(2).refreshBody();
        this.ladderSpeed = 100; // Initial speed of ladders
        this.ladderCount = 0; 
        // Create the player animations using the loaded spritesheet
        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 4 }),
            frameRate: 5,// framerates
            repeat: -1
        });
        //============================cloud & stars=======================

        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 1000,
            setXY: { x: config.width, y: 0, stepX: Phaser.Math.Between(100, 500), stepY: Phaser.Math.Between(20, config.height) }
        });
    
        // Set velocity and disable gravity for each star
        this.stars.children.iterate(function (star) {
            star.body.setAllowGravity(false);
            star.setVelocityX(-Phaser.Math.Between(100, 500));
        });

    
        // Create a group for clouds similarly
        
        // Set up a timer event for spawning stars
        this.time.addEvent({
            delay: 100, // Spawn a star every 100ms
            callback: this.spawnStar,
            callbackScope: this,
            loop: true
        });

        // Set up a timer event for spawning clouds with a different delay
        this.time.addEvent({
            delay: 500, // Spawn a cloud every 500ms
            callback: this.spawnCloud,
            callbackScope: this,
            loop: true
        });
    
        //============================cloud & stars ======================

        //TVmonster=========================
        this.spawnLadderTimer = this.time.addEvent({
            delay: 2000,                // Spawn a ladder every 2000ms
            callback: this.spawnLadder, // the function to call
            callbackScope: this,        // scope to the Play scene
            loop: true                  // run this indefinitely
        });
        //================================================
        // Create the player sprite and set physics properties
        this.pixelPlayer = this.physics.add.sprite(100, 450, 'player');
        this.pixelPlayer.setCollideWorldBounds(true);
        this.ladders = this.physics.add.group();
        // Make the player collide with the ground
        this.physics.add.collider(this.pixelPlayer, ground);

        // Set up cursor keys for input
        this.cursors = this.input.keyboard.createCursorKeys();
        this.pixelPlayer.setCollideWorldBounds(true); 
        this.physics.add.collider(this.pixelPlayer, ground);
    
        // Set the camera's initial position
        //this.cameras.main.startFollow(this.pixelPlayer, true, 0.05, 0.05);
        //this.cameras.main.setFollowOffset(0, 0);
        //this.physics.add.collider(this.pixelPlayer, this.ladder.platform);
        this.lastLadderY = this.scale.height;


        // Set up a timed event to call spawnLadder periodically
        this.time.addEvent({
            delay: 2000,                // run the callback every 2000ms
            //callback: this.spawnLadder, // the function to call
            callbackScope: this,        // scope to the Play scene
            loop: true                  // run this indefinitely
        });
        this.ladders = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });


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
        //==============================cloud stars

 
        // Optionally spawn new stars and clouds at random intervals
        // ... your existing spawn code ...
    
        // ... rest of the update code ...

        //==============================cloud stars

        if (this.cursors.up.isDown && this.pixelPlayer.body.touching.down) {
            this.pixelPlayer.setVelocityY(-330);
        }



        // Increase the speed of the ladders and possibly spawn more

    }
    spawnLadder() {
        // Decide whether to spawn a ladder based on player activity
        if (this.pixelPlayer.body.touching.down || this.cursors.up.isDown) {
            // Set the ladder to appear at the player's height
            let ladderY = this.pixelPlayer.y;

            // Choose to spawn the ladder on the right side off-screen
            let ladderX = this.scale.width + 50;  // Spawn just off screen to the right

            // Create a new Ladder instance
            let ladder = new Ladder(this, ladderX, ladderY, 'ladder');
            ladder.body.setVelocityX(-this.ladderSpeed); // Ladder should move left towards the player
            
            // Add the newly created ladder to the ladders group
            this.ladders.add(ladder);

            // Handle collision with the ladder
            this.physics.add.collider(this.pixelPlayer, ladder, this.hitLadder, null, this);

            // Optionally increase the ladder count to make the game harder over time
            this.ladderCount++;
            if (this.ladderCount % 5 === 0) {
                this.ladderSpeed += 20;  // Increase the ladder speed after every 5 ladders
            }
        }
    }
    spawnStar() {
        let y = Phaser.Math.Between(0, this.sys.game.config.height);
        let star = this.physics.add.image(this.sys.game.config.width, y, 'star');
        star.setVelocityX(-200); // Adjust the speed as needed
        star.body.setAllowGravity(false); 

        // Optionally add a boundary check to destroy the star when it goes off screen
        star.setInteractive().on('pointerdown', () => {
            star.destroy(); // Or some other interaction
        });
    }

    spawnCloud() {
        let y = Phaser.Math.Between(0, this.sys.game.config.height / 2);
        let cloud = this.physics.add.image(this.sys.game.config.width, y, 'cloud');
        cloud.setVelocityX(-100); // Clouds might move slower for a parallax effect
        cloud.body.setAllowGravity(false); 
        // Boundary check to destroy the cloud when it goes off screen
        cloud.setInteractive().on('pointerdown', () => {
            cloud.destroy(); // Or some other interaction
        });
    }
    hitLadder(player, ladder) {
        // Player hit the ladder, perform any necessary logic such as ending the game
        // For example: this.scene.start('GameOver', { score: this.playerScore });
        // Or, you could just remove the ladder and reduce player health or points
        ladder.destroy();
        // Reduce player health or points
        // this.playerHealth -= 10;
    }
    
    
}

