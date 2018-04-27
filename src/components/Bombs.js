import Phaser from 'phaser'
import { addHighscore, showHighscores } from './Highscore'
import { worldProp } from '../config/dimensions'

let g

export function setupBombs(game) {
  g = game

  g.bombs = g.physics.add.group()

  //  Collide the player and the stars with the platforms
  g.physics.add.collider(g.bombs, g.groundLayer)

  g.physics.add.collider(g.player, g.bombs, hitBomb, null, g)

  function hitBomb(player) {
    g.fxGameOver.play()
    g.physics.pause()
    player.setTint(0xff0000)
    player.anims.play('turn')
    g.gameOver = true
    g.cam.flash(1000)
    // this.cameras.main.shake(2500)

    g.time.delayedCall(2500, () => {
      addHighscore(g.score)
      showHighscores(this)
    }, [], this)
  }
}

export function createBomb(player) {
  const x = (player.x < 400 + worldProp.x)
    ? Phaser.Math.Between(400 + worldProp.x, 800 + worldProp.x)
    : Phaser.Math.Between(worldProp.x, 400 + worldProp.x)

  const bomb = g.bombs.create(x, 16, 'bomb')
  bomb.setBounce(1)
  bomb.setCollideWorldBounds(true)
  bomb.setVelocity(Phaser.Math.Between(-200, 200), 20)
  bomb.allowGravity = false
}

