import Phaser from 'phaser'
import firestore from '../config/firestore'
import { mapProps, camProps, worldProp } from '../config/dimensions'

let playerName = ''
let playerScore = 0

export function setupHighscore(game) {
  const g = game
  // the score
  g.scoreText = game.add.text(
    16, 16, 'Score: 0',
    { font: '400 32px VT323', fill: '#000' },
  )
  g.scoreText.setScrollFactor(0)

  g.score = 0
}

export function addHighscore(score) {
  playerScore = score
  playerName = prompt('Enter your name', localStorage.getItem('misimiPlayerName') || '')

  if (playerName) {
    localStorage.setItem('misimiPlayerName', playerName)
    firestore.collection('highscores').add({
      points: score,
      name: playerName,
      createdAt: new Date().toISOString(),
    })
  }
}

export function showHighscores(game) {
  const rect = new Phaser.Geom.Rectangle(0, 0, mapProps.width, mapProps.height)
  const graphics = game.add.graphics({ fillStyle: { color: 'black', alpha: '.65' } })
  graphics.fillRectShape(rect)

  const hsColor = '#fff'

  const nameFontProps = {
    font: '400 34px VT323',
    color: hsColor,
    align: 'left',
  }

  const numberFontProps = {
    font: '400 34px VT323',
    color: hsColor,
    align: 'right',
  }

  const container = game.add.container((camProps().width - game.cam.x) / 2, 100)

  const setContainerWidth = () => {
    container.x = camProps().width / 2
  }
  window.addEventListener('resize', setContainerWidth)
  container.setScrollFactor(0)

  const title = game.add.text(0, 0, 'MISIMI', { font: '400 80px VT323', color: hsColor })
  Phaser.Display.Align.In.Center(title, game.add.zone(0, 0, 0, 0))
  title.setScrollFactor(0)
  container.add(title)

  const subTitle = game.add.text(0, 0, 'High Scores', { font: '400 50px VT323', color: hsColor })
  Phaser.Display.Align.In.Center(subTitle, game.add.zone(0, 50, 0, 0))
  subTitle.setScrollFactor(0)
  container.add(subTitle)

  const leftAligner = -165
  const topAligner = 100

  const hsPositions = game.add.text(0, 0, '', numberFontProps)
  Phaser.Display.Align.In.Center(hsPositions, game.add.zone(leftAligner, topAligner, 0, 0))
  hsPositions.setScrollFactor(0)
  container.add(hsPositions)

  const hsNames = game.add.text(0, 0, '', nameFontProps)
  Phaser.Display.Align.In.Center(hsNames, game.add.zone(leftAligner + 70, topAligner, 0, 0))
  hsNames.setScrollFactor(0)
  container.add(hsNames)

  const hsPoints = game.add.text(0, 0, '', numberFontProps)
  Phaser.Display.Align.In.Center(hsPoints, game.add.zone(leftAligner + 250, topAligner, 0, 0))
  hsPoints.setScrollFactor(0)
  container.add(hsPoints)

  const formatName = name => name.toUpperCase().replace(/[^A-Z0-9]+/g, '').substr(0, 10)

  firestore.collection('highscores').orderBy('points', 'desc').onSnapshot((snapshot) => {
    let hsPositionsStr = ''
    let hsNamesStr = ''
    let hsPointsStr = ''
    let i = 1
    let foundPlayersSpot
    let lowestTopScore = 999999999

    snapshot.forEach((doc) => {
      const { name, points } = doc.data()

      if (i <= 10) {
        if (lowestTopScore > points) lowestTopScore = points
        hsPositionsStr += `${i}.\n`
        hsNamesStr += `${formatName(name)}\n`
        hsPointsStr += `${points}\n`
      } else if (
        playerName &&
        (points < playerScore) &&
        !foundPlayersSpot &&
        (playerScore <= lowestTopScore)
      ) {
        hsPositionsStr += `\n${i}.\n`
        hsNamesStr += `...\n${formatName(playerName)}\n`
        hsPointsStr += `\n${playerScore}\n`
        foundPlayersSpot = true
      }

      i += 1
    })

    hsPositions.setText(hsPositionsStr)
    hsNames.setText(hsNamesStr)
    hsPoints.setText(hsPointsStr)
  })
}
