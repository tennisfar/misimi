import Phaser from 'phaser'
import { setupCamera } from '../components/Camera'
import { setupPlayer, navigatePlayer } from '../components/Player'
import { setupMap } from '../components/World'
import setupStars from '../components/Stars'
import { setupBombs } from '../components/Bombs'
import { setupHighscore } from '../components/Highscore'

export default class Main extends Phaser.Scene {
  constructor() {
    super('main')
  }

  create() {
    setupMap(this)
    setupPlayer(this)
    setupBombs(this)
    setupStars(this)
    setupHighscore(this)
    setupCamera(this)

    this.fx = this.sound.add('sfx')
    this.fx.allowMultiple = true
    this.fxGameOver = this.sound.add('gameOver')
  }

  update() {
    if (this.gameOver) return
    navigatePlayer(this)
  }
}
