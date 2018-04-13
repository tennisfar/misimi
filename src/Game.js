import Phaser from 'phaser';
import Preloader from './scenes/Preloader';
import Main from './scenes/Main';

window.onload = function () {
  const config = {
    type: Phaser.AUTO,
    parent: 'content',
    height: 650,
    width: 800,
    physics: {
      arcade: {
        debug: false,
        gravity: { y: 300 },
      },
      default: 'arcade',
    },
    scene: [
      Preloader,
      Main,
    ],
  };

  const game = new Phaser.Game(config);

  function resize() {
    const canvas = document.querySelector('canvas');
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const windowRatio = windowWidth / windowHeight;
    const gameRatio = 800 / 650;
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
