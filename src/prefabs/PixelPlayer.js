class PixelPlayer extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, keys,frame) {
        super(scene, x, y, texture, frame);

 
        scene.add.existing(this);
        scene.physics.world.enable(this); // Add to the physics worldÍ
        
        // Set the player to collide with the bounds of the world.
        //this.setCollideWorldBounds(true);

        // Assign the keys passed from the main game scene.
        this.keyLeft = keys.keyLeft;
        this.keyRight = keys.keyRight;
        this.keyUP = keys.keyUP;
        //this.physics.add.sprite(x, y, 'spriteKey');
        // Player properties
        this.jumpSpeed = -300; // The speed at which the player will move up
        this.moveSpeed = 150; // The speed for moving left or right
    }

    update() {
        // Apply gravity manually if not using an Arcade Physics body
        // This is a simple way to simulate gravity if your character is floating
        
        if (!this.body.onFloor()) {
            this.y += 4; // This number controls the faÍll speed, adjust as needed
        }
    
        // Moving Left
        if (this.keyLeft.isDown) {
            this.x -= this.moveSpeed;
            // here you might want to set the sprite to face left, play walking animation, etc.
        }
        
        // Moving Right
        if (this.keyRight.isDown) {
            this.x += this.moveSpeed;
            // here you might want to set the sprite to face right, play walking animation, etc.
        }
        
        // Jumping
        if (this.keyUP.isDown && this.body.onFloor()) {
            this.body.setVelocityY(this.jumpSpeed); // This will make the player jump
        }
    
        // Ducking or any other action can be added in a similar way by checking the respective key
    
        // Here you can also check for game boundaries to prevent the player from going off-screen
        this.x = Phaser.Math.Clamp(this.x, 0, this.scene.sys.canvas.width);
        // The y-coordinate should be clamped based on ground position, not 0
        this.y = Phaser.Math.Clamp(this.y, this.groundPositionY, this.scene.sys.canvas.height);
    
        // Additional code to handle animations and player state
    }
    
}
