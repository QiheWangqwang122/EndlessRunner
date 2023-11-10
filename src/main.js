/******
 * First Name : Qihe(Jason)
 * Last Name : Wang
 * Hours : 40 (TO MUCH BUGSSSSSSSSSSSSSSSSSSSS)
 * Credit example 1
 * Background music from PlayOnLoop.com
 * Licensed under Creative Commons by Attribution 4.0
 * 
 */

'use strict';
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 300 },
        debug: false
      }
    },
    scene: [Menu,Play,GameOver,GameDescribe]  // assuming you have a Menu scene as well
  };
  
  const game = new Phaser.Game(config);
  let level;
  let newHighScore = false;
  let highScoreText ;
  let cursors;