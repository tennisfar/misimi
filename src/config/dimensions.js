const tileWidth = 35
const tileHeight = 35

export const canvas = {
  width: window.screen.width,
  height: window.screen.height,
}

export const start = {
  x: tileHeight * 10,
  y: tileWidth * 10,
}

export const worldProp = {
  x: start.x,
  y: start.y,
  tilesX: 23,
  tilesY: 19,
}
worldProp.width = worldProp.tilesX * tileWidth
worldProp.height = worldProp.tilesY * tileHeight

export const mapProps = {
  width: tileWidth * 50,
  height: tileHeight * 100,
}

export function camProps() {
  let maxTilesX = Math.floor(window.innerWidth / tileWidth)
  maxTilesX = maxTilesX > worldProp.tilesX ? worldProp.tilesX : maxTilesX
  const width = (maxTilesX * tileWidth)

  let maxTilesY = Math.floor(window.innerHeight / tileHeight)
  maxTilesY = maxTilesY > worldProp.tilesY ? worldProp.tilesY : maxTilesY
  const height = (maxTilesY * tileHeight)

  const x = (window.innerWidth - width) / 2
  const y = (window.innerHeight - height) / 2

  return {
    width, height, x, y,
  }
}
