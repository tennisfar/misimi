import Phaser from 'phaser';
import {addHighscore, showHighscores} from '../highscore';

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
    this.cameras.main.shake(500);

    this.time.delayedCall(500, function () {
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

    //  The platforms group contains the ground and the 2 ledges we can jump on
    this.platforms = this.physics.add.staticGroup();

    //  Here we create the ground.
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    this.platforms.create(400, 618, 'ground').setScale(2, 2).refreshBody();

    //  Now let's create some ledges
    this.platforms.create(600, 450, 'ground');
    this.platforms.create(50, 300, 'ground');
    this.platforms.create(750, 270, 'ground');

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

    //  Input Events
    this.cursors = this.input.keyboard.createCursorKeys();

    //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
    this.stars = this.physics.add.group({
      key: 'star',
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 },
    });

    this.stars.children.iterate((child) => {
      //  Give each star a slightly different bounce
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    this.bombs = this.physics.add.group();

    //  The score
    this.scoreText = this.add.text(16, 16, 'Score: 0', { font: '400 32px VT323', fill: '#000' });

    //  Collide the player and the stars with the platforms
    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.stars, this.platforms);
    this.physics.add.collider(this.bombs, this.platforms);

    //  Checks to see if the player overlaps with any of the stars,
    //  if he does call the collectStar function
    this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);

    this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);

    this.fx = this.sound.add('sfx');
    this.fx.allowMultiple = true;
    this.fxGameOver = this.sound.add('gameOver');

    this.score = 0;

    this.btnLeft = this.add.sprite(0, 0, '').setInteractive();
    this.btnRight = this.add.sprite(545, 0, '').setInteractive();
    this.btnDown = this.add.sprite(272, 0, '').setInteractive();
    
    this.btnLeft.on('pointerdown', () => this.movingLeft = true);
    this.btnLeft.on('pointerup', () => this.movingLeft = false);
    
    this.btnRight.on('pointerdown', () => this.movingRight = true);
    this.btnRight.on('pointerup', () => this.movingRight = false);

    this.btnDown.on('pointerdown', () => this.movingUp = true);
    this.btnDown.on('pointerup', () => this.movingUp = false);
    
    this.btnLeft.setScale(8, 20.1);
    this.btnRight.setScale(8, 20.1);
    this.btnDown.setScale(8, 20.1);
    this.btnLeft.setOrigin(0, 0);
    this.btnRight.setOrigin(0, 0);
    this.btnDown.setOrigin(0, 0);
    
    this.btnLeft.alpha = 0.0001;
    this.btnRight.alpha = 0.0001;
    this.btnDown.alpha = 0.0001;
  }

  update() {
    if (this.gameOver) {
      return;
    }

    if ((this.cursors.up.isDown || this.cursors.space.isDown || this.movingUp) && this.player.body.touching.down) {
      this.player.setVelocityY(-330);
    } else if (this.cursors.left.isDown || this.movingLeft) {
      this.player.setVelocityX(-160);
      this.player.anims.play('left', true);

    } else if (this.cursors.right.isDown || this.movingRight) {
      this.player.setVelocityX(160);
      this.player.anims.play('right', true);

    } else {
      this.player.setVelocityX(0);
      this.player.anims.play('turn');

    }

  }
}
