// const imgSky = require('./assets/sky.png');
// const imgPlatform = require('./assets/platform.png');
// const imgStar = require('./assets/star.png');
// const imgBomb = require('./assets/bomb.png');
// const imgMisimi = require('./assets/misimi.png');
// const sndCollect = require('./audio/131660__bertrof__game-sound-correct.wav');
// const sndGameOver = require('./audio/406113__daleonfire__dead.wav');

// import imgSky from './assets/sky.png';
// import imgPlatform from './assets/platform.png';
// import imgStar from './assets/star.png';
// import imgBomb from './assets/bomb.png';
// import imgMisimi from './assets/misimi.png';
// import sndCollect from './audio/131660__bertrof__game-sound-correct.wav';
// import sndGameOver from './audio/406113__daleonfire__dead.wav';

export default function () {
  this.load.image('sky', './assets/sky.png');
  this.load.image('ground', './assets/platform.png');
  this.load.image('star', './assets/star.png');
  this.load.image('bomb', './assets/bomb.png');
  this.load.spritesheet('dude', './assets/misimi.png', { frameWidth: 32, frameHeight: 57 },
  );

  this.load.audio('sfx', ['./audio/131660__bertrof__game-sound-correct.wav']);
  this.load.audio('gameOver', ['./audio/406113__daleonfire__dead.wav']);
}
