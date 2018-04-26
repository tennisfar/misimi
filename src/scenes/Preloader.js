import Phaser from 'phaser'
import { config } from '../config/preload'

export default class Preloader extends Phaser.Scene {
  constructor() {
    super({
      key: 'preloader',
      files: [
        { type: 'image', key: 'sky', url: './assets/images/sky.png' },
        { type: 'image', key: 'star', url: './assets/images/star.png' },
        { type: 'image', key: 'bomb', url: './assets/images/bomb.png' },
      ],
    })
  }

  preload() {
    this.loadSpritesheet()
    this.loadAudio()
  }

  create() {
    this.scene.start('main')
  }

  loadSpritesheet() {
    this.load.spritesheet(
      'misimi',
      './assets/spritesheets/misimi.png',
      { frameWidth: 32, frameHeight: 57 },
    )

    this.load.tilemapTiledJSON('map', './assets/spritesheets/misimi.json')
    this.load.spritesheet(
      'tiles',
      './assets/spritesheets/tiles.png',
      { frameWidth: 35, frameHeight: 35 },
    )
  }

  loadAudio() {
    const { audioPath, audioFiles } = config
    this.load.setPath(audioPath)

    for (let i = 0; i < audioFiles.length; i += 1) {
      this.load.audio(
        audioFiles[i].key,
        audioFiles[i].mp3,
        audioFiles[i].ogg,
      )
    }
  }
}
