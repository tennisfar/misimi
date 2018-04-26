import Phaser from 'phaser'
import Preloader from '../scenes/Preloader'
import Main from '../scenes/Main'
import { version } from '../../package.json'

export default {
  type: Phaser.AUTO,
  parent: 'content',
  height: 19 * 35,
  width: 23 * 35,
  title: 'Misimi',
  url: 'http://mikelothar.github.io/misimi / http://misimi.netlify.com',
  version,
  roundPixels: true,
  banner: {
    hidePhaser: true,
  },
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
