import Phaser from "phaser";
import firestore from "./firestore";

export function addHighscore(score) {
  let playerName = prompt("Enter your name", localStorage.getItem("misimiPlayerName") || '');

  if (playerName) {
    localStorage.setItem("misimiPlayerName", playerName);
    firestore.collection("highscores").add({
      points: score,
      name: playerName,
      createdAt: new Date().toISOString()
    });
  }
}

export function showHighscores(game) {
  const rect = new Phaser.Geom.Rectangle(250, 100, 300, 350);
  const graphics = game.add.graphics({ fillStyle: { color: "rgba(0, 0, 0, 0.5)" } });
  graphics.fillRectShape(rect);

  game.add.text(290, 120, 'Misimi High Score List', {
    fontSize: '16px',
    fill: 'white'
  });

  let hsPos;
  let hsName;
  let hsScore;

  firestore.collection("highscores").onSnapshot(snapshot => {
    let highscores = [];
    snapshot.forEach(doc => {
      const highscore = doc.data();
      highscore.id = doc.id;
      highscores.push(highscore);
    });
    // Sort our todos based on time added
    highscores.sort((a, b) => a.points > b.points ? -1 : 1);

    for (let i = 0; i < 10; i++) {
      if (highscores[i]) {
        if (hsPos && i === 0) {
          hsPos.setText('');
          hsName.setText('');
          hsScore.setText('');
        }
        hsPos = game.add.text(290, 180 + i * 25, i + 1 + '.');
        hsName = game.add.text(330, 180 + i * 25, highscores[i].name.toUpperCase().replace(/[^A-Z0-9]+/g, '').substr(0, 10));
        hsScore = game.add.text(460, 180 + i * 25, highscores[i].points);
      }
    }
  });
}
