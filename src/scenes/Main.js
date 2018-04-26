import Phaser from 'phaser';
import { addHighscore, showHighscores } from '../highscore';
import { initNavigation, navigation } from '../components/Navigate';

export default class Main extends Phaser.Scene {
  constructor() {
    super('main');
  }

  hitBomb(player) {
    this.fxGameOver.play();
    this.physics.pause();
    player.setTint(0xff0000);
    player.anims.play('turn');
    this.gameOver = true;
    this.cameras.main.shake(2500);

    this.time.delayedCall(2500, function () {
      addHighscore(this.score);
      showHighscores(this);
    }, [], this);
  }

  collectStar(player, star) {
    star.disableBody(true, true);

    this.fx.play();

    //  Add and update the score
    this.score += 10;
    this.scoreText.setText(`Score: ${this.score}`);

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

  create() {
    //  A simple background for our game
    this.add.image(400, 300, 'sky').setScale(2, 2);

    // load the map 
    const map = this.make.tilemap({ key: 'map' });

    // tiles for the ground layer
    const groundTiles = map.addTilesetImage('tiles');
    // create the ground layer
    const groundLayer = map.createDynamicLayer('World', groundTiles, 0, 0);
    // the player will collide with this layer
    groundLayer.setCollisionByExclusion([-1]);

    // The player and its settings
    this.player = this.physics.add.sprite(100, 450, 'misimi');

    //  Player physics properties. Give the little guy a slight bounce.
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    //  Our player animations, turning, walking left and walking right.
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('misimi', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'turn',
      frames: [{ key: 'misimi', frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('misimi', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });

    initNavigation(this);

    //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
    this.stars = this.physics.add.group({
      key: 'star',
      repeat: 11,
      setXY: { x: 17, y: 0, stepX: 70 },
    });

    this.stars.children.iterate((child) => {
      //  Give each star a slightly different bounce
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    this.bombs = this.physics.add.group();

    //  Collide the player and the stars with the platforms
    this.physics.add.collider(this.player, groundLayer);
    this.physics.add.collider(this.stars, groundLayer);
    this.physics.add.collider(this.bombs, groundLayer);

    //  The score
    this.scoreText = this.add.text(16, 16, 'Score: 0', { font: '400 32px VT323', fill: '#000' });

    //  Checks to see if the player overlaps with any of the stars,
    //  if he does call the collectStar function
    this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);

    this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);

    this.fx = this.sound.add('sfx');
    this.fx.allowMultiple = true;
    this.fxGameOver = this.sound.add('gameOver');

    this.score = 0;


  }

  update() {
    if (this.gameOver) return;
    navigation(this);
  }
}
