
class Menu extends Phaser.Scene {
    constructor() {
      super('menuScene');
    }
  
    preload() {
      // Load the cursor image
      this.load.image('cursor', './assets/cursor.png');
      this.load.audio('cursorSound','./assets/cursorSound.mp3');
    }
  
    create() {
        // Menu text setup
        this.add.text(400, 100, 'PIXEL RUNNER', { 
          fontSize: '64px', 
          fill: '#FF0000', 
          stroke: '#FFFFFF', 
          strokeThickness: 6 
        }).setOrigin(0.5);
        
        this.playText = this.add.text(400, 300, 'Play the goddamn game', { 
          fontSize: '24px', 
          fill: '#FFF' 
        }).setOrigin(0.5);
        
        this.describeText = this.add.text(400, 400, 'How to play the game', { 
          fontSize: '24px', 
          fill: '#FFF' 
        }).setOrigin(0.5);
      
        // Calculate cursor positions
        const cursorPadding = 30;
        const playTextCursorX = this.playText.x + this.playText.width / 2 + cursorPadding;
        const describeTextCursorX = this.describeText.x + this.describeText.width / 2 + cursorPadding;
      
        // Cursor setup
        this.cursor = this.add.image(playTextCursorX, this.playText.y, 'cursor');
      
        // Set initial position of the cursor (right of the first option)
        this.cursorInitialX = playTextCursorX;
        
        // Initialize selection
        this.currentSelection = 0;
      
        // Input setup
        this.cursors = this.input.keyboard.createCursorKeys();
      
        // Enter key setup
        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
      }
    update() {
      // Move cursor between options
      if (Phaser.Input.Keyboard.JustDown(this.cursors.down) && this.currentSelection === 0) {
        this.cursor.setPosition(this.cursorInitialX, this.describeText.y);
        this.sound.play('cursorSound');
        this.currentSelection = 1;
      } else if (Phaser.Input.Keyboard.JustDown(this.cursors.up) && this.currentSelection === 1) {
        this.cursor.setPosition(this.cursorInitialX, this.playText.y);
        this.currentSelection = 0;
        this.sound.play('cursorSound');
      }
  
      // Select option
      if (Phaser.Input.Keyboard.JustDown(this.enterKey)) {
        if (this.currentSelection === 0) {
            this.scene.manager.scenes[1].survivalTime = 0
          // Start the game
          this.scene.start('playScene');
            // clear last score


        } else {
          // Show how to play
          this.scene.start('describeScene');
          
        }
      }
    }
  }
  