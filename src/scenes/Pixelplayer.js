// Player.js
class Pixelplayer extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture,keys) {
      super(scene, x, y, texture);
      
      //scene.add.existing(this);
      //scene.physics.add.existing(this);
        
      // Player properties
    //   this.setCollideWorldBounds(true); // Prevent player from leaving the canvas
    //   this.body.setGravityY(0); // Set gravity only for the y axis
    //   this.MoveSpeed = 3;
    //   this.keyLeft = keys.keyLeft;
    //   this.keyRight = keys.keyRight;
    //   this.keyUP = keys.keyUP;
    //   this.setOrigin(0.5, 0);
      // Keyboard keys
      //this.cursors = scene.input.keyboard.createCursorKeys();

    }
    // create() {
    //   this.anims.create({
    //     key: 'stand',
    //         frames: [{ key: 'player', frame: 0 }],
    //         frameRate: 10
    //     });

    //     // Create the running animation using frames 1-4
    //   this.anims.create({
    //     key: 'run',
    //         frames: this.anims.generateFrameNumbers('player', { start: 1, end: 4 }),
    //         frameRate: 10,
    //         repeat: -1
    //     });        
    // }


    update() {
        console.log("hello");
    }

}