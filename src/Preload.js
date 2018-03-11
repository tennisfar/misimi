export default function () {
  this.load.image('sky', './assets/sky.png');
  this.load.image('ground', './assets/platform.png');
  this.load.image('star', './assets/star.png');
  this.load.image('bomb', './assets/bomb.png');
  this.load.spritesheet('dude', './assets/misimi.png', { frameWidth: 32, frameHeight: 57 });

  this.load.audio('sfx', ['./audio/131660__bertrof__game-sound-correct.wav']);
  this.load.audio('gameOver', ['./audio/406113__daleonfire__dead.wav']);
}
