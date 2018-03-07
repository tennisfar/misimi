import imgSky from './assets/bg.png'
import imgPlatform from './assets/platform.png'
import imgBeam from './assets/beam.png'
import imgStar from './assets/beer.png'
import imgBomb from './assets/bomb.png'
import imgMisimi from './assets/misimi-v2.png'

function preload() {
    this.load.image('sky', imgSky);
    this.load.image('ground', imgPlatform);
    this.load.image('beam', imgBeam);
    this.load.image('star', imgStar);
    this.load.image('bomb', imgBomb);
    this.load.spritesheet('dude',
        imgMisimi,
        {frameWidth: 32, frameHeight: 59}
    );
}

export default preload