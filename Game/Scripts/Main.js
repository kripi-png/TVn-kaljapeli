const [ spawnX, spawnY ] = [ 1024/2, 600/2 ];

let lastDrink = 0;
const drinkCooldown = 1000;

let text;
let player;
let kaljaCounter = 0;

class Kaljapeli extends Phaser.Scene {
  constructor() {
    super();
  }

  preload() {
    this.load.spritesheet('TV', './Game/Assets/images/TV.png', { frameWidth: 150, frameHeight: 300 });
    this.load.spritesheet('drinkKalja', './Game/Assets/images/drinkKalja.png', { frameWidth: 150, frameHeight: 300, endFrame: 4 });
    this.load.spritesheet('drinkLonkero', './Game/Assets/images/drinkLonkero.png', { frameWidth: 150, frameHeight: 300, endFrame: 4 });
    this.load.spritesheet('arrow', './Game/Assets/images/arrow.png', { frameWidth: 150, frameHeight: 300, endFrame: 4 });
    this.load.image('background', './Game/Assets/images/background.png');
    this.load.image('kaljaButton', './Game/Assets/images/kalja.png');
    this.load.image('lonkeroButton', './Game/Assets/images/lonkero.png');
  }

  create() {
    // x and y are the image's center coordinates
    // so e.g. for a background you probably want to use
    // gameWidth / 2, gameHeight / 2
    const background = this.add.image(1024/2, 600/2, 'background');
    player = this.add.sprite(spawnX,spawnY,'TV', 0);
    player.setScale(2)

    const drinkKalja = {
        key: 'drinkKalja',
        frames: this.anims.generateFrameNumbers('drinkKalja', { start: 0, end: 4 }),
        frameRate: 5,
        repeat: 0
    };

    const drinkLonkero = {
        key: 'drinkLonkero',
        frames: this.anims.generateFrameNumbers('drinkLonkero', { start: 0, end: 4 }),
        frameRate: 5,
        repeat: 0
    };

    this.anims.create(drinkKalja);
    this.anims.create(drinkLonkero);

    const style = { font: "bold 32px Arial", fill: "#fff" };
    text = this.add.text(750, 0, `Kalja Counter: ${kaljaCounter}`, style);

    // button
    const kaljaButton = this.add.image( 60, 500, 'kaljaButton');
    kaljaButton.setScale(.30);
    kaljaButton.setInteractive()
      .on('pointerdown', () => { kaljaButton.setScale( .32 ); drinkHandler('kalja') })
      .on('pointerup', () => kaljaButton.setScale( .30 ));

    const lonkeroButton = this.add.image( 160, 500, 'lonkeroButton');
    lonkeroButton.setScale(.30);
    lonkeroButton.setInteractive()
      .on('pointerdown', () => { lonkeroButton.setScale( .32 ); drinkHandler('lonkero') })
      .on('pointerup', () => lonkeroButton.setScale( .30 ));

    const driveButton = this.add.text( 10, 10, 'Aja', { font: "bold 32px Arial", fill: "#000" });
    driveButton.setScale( 1.5 );
    driveButton.setInteractive()
    .on( 'pointerdown', () => { driveButton.setScale( 1.82 ); driveButtonHandler() })
    .on( 'pointerup', () => { driveButton.setScale( 1 ); });

  }

  update(time, delta) {
    text.setText(
      `Kalja Counter: ${kaljaCounter}`
    );
  }
}

function drinkHandler( str ) {
  const timeDelta = game.getTime() - lastDrink;
  if ( !(timeDelta >= drinkCooldown) ) return;
  lastDrink = game.getTime();

  const canclick = getSound('canclick');
  canclick.play();

  if ( str === 'kalja' ) {
    player.play('drinkKalja');
    kaljaCounter++;

  } else {
    const hyisaatana = getSound('hyisaatana');
    hyisaatana.volume = .1;
    player.play('drinkLonkero');

    setTimeout(function () {
      hyisaatana.play();
      let arrow = game.scene.scenes[0].physics.add.sprite(player.x, player.y - 140, 'arrow');
      arrow.body.angularVelocity = -500;
      arrow.setScale(2);
      arrow.setVelocityX(-600);
    }, 600);
  }
}

function getSound(name) {
  let audio;
  audios.forEach(item => {
    if ( item.dataset.name === name ) {
      audio = item;
    }
  });

  return audio;
}

function driveButtonHandler() {
  game.scene.start( 'Drive' );
  game.scene.stop( 'Kaljapeli' );
  game.scene.destroy( 'Kaljapeli' );
}

class DriveMode extends Phaser.Scene {
  constructor() {
    super();
  }

  preload() {
    this.load.image('car', './Game/Assets/images/car.png');
    this.load.image('road', './Game/Assets/images/road.png');
  }

  create() {
    console.log( 'asd' );
    console.log( this );
    const background = this.add.image(1024/2, 600/2, 'road');
    player = this.add.sprite(100,100,'car', 0);
  }

  update() {

  }
 }

const gameSettings = {
  height: 600,
  type: Phaser.WEBGL,
  parent: 'game-canvas',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  scene: Kaljapeli
}

const game = new Phaser.Game(gameSettings);
game.scene.add( 'Drive', DriveMode );

const audios = document.querySelectorAll('audio');
