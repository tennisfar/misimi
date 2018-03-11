const imgSky = require('./assets/sky.png');
const imgPlatform = require('./assets/platform.png');
const imgStar = require('./assets/star.png');
const imgBomb = require('./assets/bomb.png');
const imgMisimi = require('./assets/misimi.png');
const sndCollect = require('./audio/131660__bertrof__game-sound-correct.wav');
const sndGameOver = require('./audio/406113__daleonfire__dead.wav');

export default function () {
    this.load.image('sky', imgSky);
    this.load.image('ground', imgPlatform);
    this.load.image('star', imgStar);
    this.load.image('bomb', imgBomb);
    this.load.spritesheet('dude',
        imgMisimi,
        {frameWidth: 32, frameHeight: 57}
    );

    this.load.audio('sfx', [sndCollect]);
    this.load.audio('gameOver', [sndGameOver]);
}
