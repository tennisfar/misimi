import Phaser from 'phaser'
import Preloader from '../scenes/Preloader'
import Main from '../scenes/Main'

export default {
  type: Phaser.AUTO,
  parent: 'content',
  height: 19 * 35,
  width: 23 * 35,
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
}
