import { camProps, worldProp, increaseWorldPropTiles } from '../config/dimensions'

let g

export function setBounds() {
  g.cam.setBounds(worldProp.x, worldProp.y, worldProp.width, worldProp.height)
  g.physics.world.setBounds(worldProp.x, worldProp.y, worldProp.width, worldProp.height)
}

export function setupCamera(game) {
  g = game
  g.cam = g.cameras.main
  // g.cam.scrollX = camProps().x
  // g.cam.scrollY = camProps().y

  const setCamViewPort = () => {
    g.cam.setViewport(
      camProps().x,
      camProps().y,
      camProps().width,
      camProps().height,
    )
  }

  setCamViewPort()
  window.addEventListener('resize', setCamViewPort)

  setBounds(g)
  g.player.setCollideWorldBounds(true)
  g.cam.startFollow(g.player)
}

export function resizeWorld(tilesX, tilesY) {
  const maxTile = Math.max(tilesX, tilesY)
  let factor = 0
  let id

  function frame() {
    if (factor > maxTile) {
      clearInterval(id)
    } else {
      const x = factor < tilesX ? 1 : 0
      const y = factor < tilesY ? 1 : 0
      increaseWorldPropTiles(x, y)
      setBounds()
      factor += 1
    }
  }

  id = setInterval(frame, 100)
}
