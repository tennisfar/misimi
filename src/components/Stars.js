import Phaser from 'phaser'
import { start, worldProp } from '../config/dimensions'
import { createBomb } from './Bombs'
import { resizeWorld } from './Camera'

let g

function collectStar(player, star) {
  // resizeWorld(4, 2)
  star.disableBody(true, true)
  g.fx.play()

  //  Add and update the score
  g.score += 10
  g.scoreText.setText(`Score: ${g.score}`)

  if (g.stars.countActive(true) === 0) {
    //  A new batch of stars to collect
    g.stars.children.iterate((child) => {
      child.enableBody(true, child.x, worldProp.y, true, true)
    })

    createBomb(player)
  }
}

export default function setupStars(game) {
  g = game

  //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
  g.stars = g.physics.add.group({
    key: 'star',
    repeat: 11,
    setXY: { x: start.x + 17, y: start.y, stepX: 70 },
  })

  g.stars.children.iterate((child) => {
    //  Give each star a slightly different bounce
    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8))
  })

  g.physics.add.collider(g.stars, g.groundLayer)
  g.physics.add.overlap(g.player, g.stars, collectStar, null, g)
}
