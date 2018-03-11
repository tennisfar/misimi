import Phaser from 'phaser';
import MisimiScene from './MisimiScene';

class MisimiGame {
  constructor() {
    this.game = new Phaser.Game({
      type: Phaser.AUTO,
      parent: 'content',
      height: 600,
      width: 800,
      physics: {
        arcade: {
          debug: false,
          gravity: { y: 300 },
        },
        default: 'arcade',
      },
      scene: [
        MisimiScene,
      ],
    });
  }
}

const game = new MisimiGame();
