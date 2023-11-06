class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
        this.survivalTime = 0;
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
        //this.ladder = new Ladder(this, 200, 300, 'ladder');
        ground.create(400, 568, 'ground').setScale(2).refreshBody();
        this.GameOver = false;
        this.ladderSpeed = 100; // Initial speed of ladders
        this.ladderCount = 0; 
        // Create the player animations using the loaded spritesheet
        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 4 }),
            frameRate: 10,// framerates
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

        //===============GameOverEvent==============
        this.timerText = this.add.text(16, this.sys.game.config.height / 2, 'Countdown: 30', {
            fontSize: '32px',
            fill: '#fff'
        });
        if(!this.GameOver)
        {
            this.time.addEvent({
                delay: 1000,
                callback: this.updateCountdown,
                callbackScope: this,
                loop: true
            });
        }

        //TVmonster=========================
        this.spawnLadderTimer = this.time.addEvent({
            delay: 3000,                // Spawn a ladder every 2000ms
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
        //console.log(this.ladderSpeed);
        this.pixelPlayer.anims.play('run', true);
        if (this.cursors.left.isDown) {
            this.pixelPlayer.setVelocityX(-160);
  
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
            this.pixelPlayer.setVelocityY(-300);
        }



        // Increase the speed of the ladders and possibly spawn more

    }
    updateTimer() {
        this.survivalTime += 1; // Increment the survival time by 1 second
        let highScore = localStorage.getItem('highScore') ? parseInt(localStorage.getItem('highScore'), 10) : 0;

        // Update the timer text to reflect the new survival time
        this.timerText.setText('Survived: ' + this.survivalTime + 's');

        // Check if the current survival time is greater than the high score
        if (this.survivalTime > highScore) {
            highScore = this.survivalTime;
            localStorage.setItem('highScore', highScore.toString()); // Store the new high score
            this.highScoreText.setText('High Score: ' + highScore + 's');
        }
    }
    spawnLadder() {
        // Decide whether to spawn a ladder based on player activity
        level ++;
        if(level %5 == 0)
        {
            this.ladderSpeed -= 15;

        }
        //let ladderX = this.pixelPlayer.x; // X position where the player is standing
        let ladderY = this.pixelPlayer.y; // Y position where the player is standing
    
        let ladder = this.ladders.create(this.sys.game.config.width, ladderY, 'ladder');
        ladder.body.setVelocityX(-this.ladderSpeed); // Move the ladder towards the left
    
        // Set ladder to not move down due to gravity
        ladder.body.setAllowGravity(false);
    
        // Check collision with the ladder
        this.physics.add.collider(this.pixelPlayer, ladder, this.checkGameOver, null, this);
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
    checkGameOver(player, ladder) {
        // Stop all movements
        this.physics.pause();
        player.setTint(0xff0000); // Optionally tint the player red to indicate damage
    
        // Stop the player's animations
        player.anims.stop();
        this.GameOver = true;
        // Transition to the Game Over scene after a short delay
        this.time.delayedCall(1000, () => {
            this.scene.start('GameOverscene'); // Replace 'gameOverScene' with your actual game over scene key
        }, [], this);
    }
    
    
    
}

