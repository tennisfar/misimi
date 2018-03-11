import Preload from './Preload';

let cursors;
let score = 0;
let gameOver = false;
let scoreText;
let fx;
let fxGameOver;

class MisimiGame {
  game: Phaser.Game;
  player: Phaser.Sprite;
  stars: Phaser.Sprite;
  bombs: Phaser.Sprite;
  platforms: Phaser.Sprite;

  constructor() {
    this.game = new Phaser.Game({
      type: Phaser.AUTO,
      height: 600,
      width: 800,
      physics: {
        arcade: {
          debug: false,
          gravity: {y: 300},
        },
        default: 'arcade',
      },
      scene: {
        preload: Preload,
        create: this.create,
        update: this.update,
      },
    });
  }

  create() {
    //  A simple background for our game
    this.add.image(400, 300, 'sky');

    //  The platforms group contains the ground and the 2 ledges we can jump on
    this.platforms = this.physics.add.staticGroup();

    //  Here we create the ground.
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    this.platforms.create(400, 568, 'ground').setScale(2, 2).refreshBody();

    //  Now let's create some ledges
    this.platforms.create(600, 400, 'ground');
    this.platforms.create(50, 250, 'ground');
    this.platforms.create(750, 220, 'ground');

    // The player and its settings
    this.player = this.physics.add.sprite(100, 450, 'dude');

    //  Player physics properties. Give the little guy a slight bounce.
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    //  Our player animations, turning, walking left and walking right.
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', {start: 0, end: 3}),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'turn',
      frames: [{key: 'dude', frame: 4}],
      frameRate: 20,
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', {start: 5, end: 8}),
      frameRate: 10,
      repeat: -1,
    });

    //  Input Events
    cursors = this.input.keyboard.createCursorKeys();

    //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
    this.stars = this.physics.add.group({
      key: 'star',
      repeat: 11,
      setXY: {x: 12, y: 0, stepX: 70},
    });

    this.stars.children.iterate((child) => {

      //  Give each star a slightly different bounce
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

    });

    this.bombs = this.physics.add.group();

    //  The score
    scoreText = this.add.text(16, 16, 'Score: 0', {fontSize: '32px', fill: '#000'});

    //  Collide the player and the stars with the platforms
    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.stars, this.platforms);
    this.physics.add.collider(this.bombs, this.platforms);

    //  Checks to see if the player overlaps with any of the stars, 
    //  if he does call the collectStar function
    this.physics.add.overlap(this.player, this.stars, collectStar, null, this);

    this.physics.add.collider(this.player, this.bombs, hitBomb, null, this);

    fx = this.sound.add('sfx');
    fx.allowMultiple = true;
    fxGameOver = this.sound.add('gameOver');
  }


  update() {
    if (gameOver) {
      return;
    }

    if (cursors.left.isDown) {
      this.player.setVelocityX(-160);

      this.player.anims.play('left', true);
    } else if (cursors.right.isDown) {
      this.player.setVelocityX(160);

      this.player.anims.play('right', true);
    } else {
      this.player.setVelocityX(0);

      this.player.anims.play('turn');
    }

    if (cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330);
    }
  }


}

// const game = new Phaser.Game(config);
window.onload = () => {
  const game = new MisimiGame();
};


function collectStar(player, star) {
  star.disableBody(true, true);

  fx.play();

  //  Add and update the score
  score += 10;
  scoreText.setText('Score: ' + score);

  if (this.stars.countActive(true) === 0) {

    //  A new batch of stars to collect
    this.stars.children.iterate((child) => {

      child.enableBody(true, child.x, 0, true, true);

    });

    const x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

    const bomb = this.bombs.create(x, 16, 'bomb');
    bomb.setBounce(1);
    bomb.setCollideWorldBounds(true);
    bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    bomb.allowGravity = false;

  }
}

function hitBomb(player, bomb) {
  fxGameOver.play();
  this.physics.pause();

  player.setTint(0xff0000);

  player.anims.play('turn');

  gameOver = true;
}
