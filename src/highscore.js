import Phaser from 'phaser';
import firestore from './config/firestore';

export function addHighscore(score) {
  const playerName = prompt('Enter your name', localStorage.getItem('misimiPlayerName') || '');

  if (playerName) {
    localStorage.setItem('misimiPlayerName', playerName);
    firestore.collection('highscores').add({
      points: score,
      name: playerName,
      createdAt: new Date().toISOString(),
    });
  }
}

export function showHighscores(game) {
  const rect = new Phaser.Geom.Rectangle(0, 0, 800, 600);
  const graphics = game.add.graphics({ fillStyle: { color: 'black', alpha: '.65' } });
  graphics.fillRectShape(rect);

  const nameFontProps = {
    font: '400 32px VT323',
    fill: 'white'
  };

  game.add.text(230, 40, 'Simi Spillet', { font: '400 70px VT323' });

  game.add.text(290, 120, 'High Scores', { font: '400 50px VT323' });

  let hsPos;
  let hsName;
  let hsScore;

  firestore.collection('highscores').onSnapshot((snapshot) => {
    let highscores = [];

    snapshot.forEach((doc) => {
      const highscore = doc.data();
      highscore.id = doc.id;
      highscores.push(highscore);
    });

    // sort by highest points
    highscores.sort((a, b) => (a.points > b.points ? -1 : 1));

    // get only unique scores
    highscores = highscores.filter((score, index, self) => index === self.findIndex((t) => t.points === score.points));

    // display top 15 scores
    for (let i = 0; i < 15; i += 1) {
      if (highscores[i]) {
        if (hsPos && i === 0) {
          hsPos.setText('');
          hsName.setText('');
          hsScore.setText('');
        }

        hsPos = game.add.text(280, 180 + (i * 25), `${i + 1}.`, nameFontProps);
        hsName = game.add.text(330, 180 + (i * 25), highscores[i].name.toUpperCase().replace(/[^A-Z0-9]+/g, '').substr(0, 10), nameFontProps);
        hsScore = game.add.text(470, 180 + (i * 25), highscores[i].points, nameFontProps);
      }
    }
  });
}
