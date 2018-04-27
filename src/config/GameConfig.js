import Phaser from 'phaser'
import Preloader from '../scenes/Preloader'
import Main from '../scenes/Main'
import { version } from '../../package.json'
import { canvas } from './dimensions'

export default {
  type: Phaser.AUTO,
  parent: 'content',
  height: canvas.height,
  width: canvas.width,
  title: 'Misimi',
  url: 'http://mikelothar.github.io/misimi / http://misimi.netlify.com',
  version,
  banner: {
    hidePhaser: true,
  },
  transparent: true,
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
