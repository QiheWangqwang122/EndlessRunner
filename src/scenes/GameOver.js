class GameOver extends Phaser.Scene {
    constructor() {
        super('GameOver');
    }

    init(data) {
        // Data passed from another scene includes the player's score
        this.playerScore = data.score;
    }

    create() {
        // Check for high score in local storage
        this.highScore = this.sys.game.registry.get('highScore') || 0;
        if (this.playerScore > this.highScore) {
            this.highScore = this.playerScore;
            this.sys.game.registry.set('highScore', this.highScore);
            newHighScore = true;
        }

        // Add Game Over text
        this.add.text(400, 300, 'GAME OVER', { fontSize: '64px', fill: '#fff' })
            .setOrigin(0.5, 0.5);

        // Display High Score
        this.add.text(400, 380, `High Score: ${this.highScore}`, { fontSize: '32px', fill: '#fff' })
            .setOrigin(0.5, 0.5);

        // Instructions to restart
        this.add.text(400, 450, 'Press "R" to Restart', { fontSize: '24px', fill: '#fff' })
            .setOrigin(0.5, 0.5);

        // Set up the "R" key to restart the game
        this.input.keyboard.on('keydown-R', () => {
            this.scene.start('Menu'); // Assuming 'Menu' is the name of your menu scene
        });
    }
}