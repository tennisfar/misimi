import { start } from '../config/dimensions'

const startPos = {
  x: start.x + 100,
  y: start.y + 450,
}

export function setupPlayer(game) {
  const g = game
  g.player = g.physics.add.sprite(startPos.x, startPos.y, 'misimi')
  g.player.setBounce(0.2)

  //  Our player animations, turning, walking left and walking right.
  g.anims.create({
    key: 'left',
    frames: g.anims.generateFrameNumbers('misimi', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1,
  })

  g.anims.create({
    key: 'turn',
    frames: [{ key: 'misimi', frame: 4 }],
    frameRate: 20,
  })

  g.anims.create({
    key: 'right',
    frames: g.anims.generateFrameNumbers('misimi', { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1,
  })

  g.cursors = g.input.keyboard.createCursorKeys()

  g.btnLeft = g.add.sprite(0, 0, '').setInteractive()
  g.btnRight = g.add.sprite(545, 0, '').setInteractive()
  g.btnDown = g.add.sprite(272, 0, '').setInteractive()

  g.btnLeft.on('pointerdown', () => {
    g.movingLeft = true
  })
  g.btnLeft.on('pointerup', () => {
    g.movingLeft = false
  })
  g.btnRight.on('pointerdown', () => {
    g.movingRight = true
  })
  g.btnRight.on('pointerup', () => {
    g.movingRight = false
  })
  g.btnDown.on('pointerdown', () => {
    g.movingUp = true
  })
  g.btnDown.on('pointerup', () => {
    g.movingUp = false
  })

  g.btnLeft.setScale(8, 20.1)
  g.btnRight.setScale(8, 20.1)
  g.btnDown.setScale(8, 20.1)
  g.btnLeft.setOrigin(0, 0)
  g.btnRight.setOrigin(0, 0)
  g.btnDown.setOrigin(0, 0)

  g.btnLeft.alpha = 0.0001
  g.btnRight.alpha = 0.0001
  g.btnDown.alpha = 0.0001

  g.physics.add.collider(g.player, g.groundLayer)
}

export function navigatePlayer(game) {
  const g = game
  if ((g.cursors.up.isDown || g.cursors.space.isDown || g.movingUp) && g.player.body.onFloor()) {
    g.player.setVelocityY(-330)
  } else if (g.cursors.left.isDown || g.movingLeft) {
    g.player.setVelocityX(-160)
    g.player.anims.play('left', true)
  } else if (g.cursors.right.isDown || g.movingRight) {
    g.player.setVelocityX(160)
    g.player.anims.play('right', true)
  } else {
    g.player.setVelocityX(0)
    g.player.anims.play('turn')
  }
}
