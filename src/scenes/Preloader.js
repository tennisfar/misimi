import {config} from '../config/preload';

export default class Preloader extends Phaser.Scene {
  constructor() {
    super({
      key: 'preloader',
      files: [
        { type: 'image', key: 'sky', url: './assets/images/sky.png' },
        { type: 'image', key: 'ground', url: './assets/images/platform.png' },
        { type: 'image', key: 'star', url: './assets/images/star.png' },
        { type: 'image', key: 'bomb', url: './assets/images/bomb.png' },
      ],
    });
  }

  preload() {
    // // add the loading bar to use as a display for the loading progress of the remainder of the assets
    // const barBg = this.add.image(this.sys.canvas.width / 2, this.sys.canvas.height / 2, 'barBg');
    // const bar = this.add.sprite(this.sys.canvas.width / 2, this.sys.canvas.height / 2, 'bar');
    // bar.setOrigin(0, 0.5);
    // bar.setPosition(bar.x - (bar.width / 2), bar.y);
    // bar.setScale(0, 1);
    //
    // this.load.on('progress', (progress: number) => {
    //   bar.setScale(progress, 1);
    // });
    //
    // this.load.on('complete', function () {
    //   barBg.destroy();
    //   bar.destroy();
    // });
    //
    // // load assets declared in the preload config
    this.loadSpritesheet();
    this.loadAudio();
  }

  create() {
    this.scene.start('main');
    // this.scene.remove('preloader');
  }

  loadSpritesheet() {
    this.load.spritesheet(
      'misimi',
      './assets/spritesheets/misimi.png',
      { frameWidth: 32, frameHeight: 57 },
    );

    // const sheetPath = config.ssPath;
    // const sheets = config.sheets;

    // this.load.setPath(sheetPath);

    // for (let i = 0; i < sheets.length; i++) {
    //   this.load.spritesheet(sheets[i], `${sheetPath + sheets[i]}.png`, `${sheetPath + sheets[i]}.json`);
    // }
  }

  loadAudio() {
    // this.load.audio('sfx', ['../../assets/audio/131660__bertrof__game-sound-correct.wav']);
    // this.load.audio('gameOver', ['../../assets/audio/406113__daleonfire__dead.wav']);
    const { audioPath, audioFiles } = config;

    this.load.setPath(audioPath);

    for (let i = 0; i < audioFiles.length; i += 1) {
      this.load.audio(
        audioFiles[i].key,
        audioFiles[i].mp3,
        audioFiles[i].ogg,
      );
    }
  }
}
