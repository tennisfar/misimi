import imgSky from './assets/sky.png'
import imgPlatform from './assets/platform.png'
import imgStar from './assets/star.png'
import imgBomb from './assets/bomb.png'
import imgMisimi from './assets/misimi.png'

import sndCollect from './audio/131660__bertrof__game-sound-correct.wav'
import sndGameOver from './audio/406113__daleonfire__dead.wav'

function preload() {
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

export default preload