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

  const webFontLoading = {
    active() {
      new Phaser.Game(config);
    },
    google: {
      families: ['VT323']
    },
    // custom: {
    //   families: ['FerrumExtracondensed'],
    //   urls: ["https://fontlibrary.org/face/ferrum"]
    // }
  };

  WebFont.load(webFontLoading);

};
