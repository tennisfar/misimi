import Phaser from 'phaser';
import MisimiScene from './MisimiScene';

window.onload = function () {
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

  function resize() {
    const canvas = document.querySelector('canvas');
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const windowRatio = windowWidth / windowHeight;
    const gameRatio = 800 / 600;
    if (windowRatio < gameRatio) {
      canvas.style.width = `${windowWidth}px`;
      canvas.style.height = `${windowWidth / gameRatio}px`;
    } else {
      canvas.style.width = `${windowHeight * gameRatio}px`;
      canvas.style.height = `${windowHeight}px`;
    }
  }

  resize();
};
