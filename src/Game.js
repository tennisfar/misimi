import Phaser from 'phaser'
import config from './config/GameConfig'

window.onload = () => {
  const webFontLoading = {
    active() {
      new Phaser.Game(config)
    },
    google: {
      families: ['VT323'],
    },
    // custom: {
    //   families: ['FerrumExtracondensed'],
    //   urls: ["https://fontlibrary.org/face/ferrum"]
    // }
  }

  WebFont.load(webFontLoading)
}
