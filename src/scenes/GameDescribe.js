
class GameDescribe extends Phaser.Scene {
  constructor() {
      super('describeScene');
  }

  create() {

      this.add.text(20, 20, 'Game Instructions', { fontSize: '32px', fill: '#FFF' });


      this.add.text(20, 60, 'Controls:', { fontSize: '24px', fill: '#FFF' });
      this.add.text(20, 90, 'Arrow keys: Move the player', { fontSize: '20px', fill: '#FFF' });
      this.add.text(20, 120, 'Spacebar: Jump', { fontSize: '20px', fill: '#FFF' });

      this.add.text(20, 160, 'How to Play:', { fontSize: '24px', fill: '#FFF' });
      this.add.text(20, 190, 'Navigate through the level, avoid obstacles, and collect stars.', { fontSize: '20px', fill: '#FFF' });
      this.add.text(20, 220, 'Survive as long as possible to score high.', { fontSize: '20px', fill: '#FFF' });

      this.add.text(20, 260, 'Press R to return to the Menu', { fontSize: '20px', fill: '#FFF' })
          .setInteractive()
          .on('pointerdown', () => this.scene.start('menuScene'));

      this.input.keyboard.on('keydown-R', () => this.scene.start('menuScene'));
  }
}
