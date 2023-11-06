class Ladder extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        // call Phaser Physics Sprite constructor
        super(scene, x, y, texture);

        this.parentScene = scene; // maintain reference to the original scene

        // set up physics sprite
        this.parentScene.add.existing(this); // add to existing scene
        this.parentScene.physics.add.existing(this); // add to physics system
        this.setImmovable(true);
        this.setVelocityX(-scene.ladderSpeed); // move left by default

        // Assuming the ladder has some sort of tint or visual differentiation
        this.tint = Math.random() * 0xFFFFFF; // randomize tint for visual variety
    }

    update() {
        // destroy ladder if it goes off screen to the left
        if (this.x < -this.width) {
            this.destroy();
        }

        // You can add additional update logic here, for example:
        // Check for collision with the player and perform actions
        // Handle interactions with other game objects
    }
}
