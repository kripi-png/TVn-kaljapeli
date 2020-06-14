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
    this.load.spritesheet('TV', './_Game/Assets/images/TV.png', { frameWidth: 150, frameHeight: 300 });
    this.load.spritesheet('drinkKalja', './_Game/Assets/images/drinkKalja.png', { frameWidth: 150, frameHeight: 300, endFrame: 4 });
    this.load.spritesheet('drinkLonkero', './_Game/Assets/images/drinkLonkero.png', { frameWidth: 150, frameHeight: 300, endFrame: 4 });
    this.load.spritesheet('arrow', './_Game/Assets/images/arrow.png', { frameWidth: 150, frameHeight: 300, endFrame: 4 });
    this.load.image('background', './_Game/Assets/images/background.png');
  }

  create() {
    // x and y are the image's center coordinates
    // so e.g. for a background you probably want to use
    // gameWidth / 2, gameHeight / 2
    const background = this.add.image(1024/2, 600/2, 'background');

    player = this.add.sprite(spawnX,spawnY,'TV', 0);
    player.setScale(2)

    var drinkKalja = {
        key: 'drinkKalja',
        frames: this.anims.generateFrameNumbers('drinkKalja', { start: 0, end: 4 }),
        frameRate: 5,
        repeat: 0
    };

    var drinkLonkero = {
        key: 'drinkLonkero',
        frames: this.anims.generateFrameNumbers('drinkLonkero', { start: 0, end: 4 }),
        frameRate: 5,
        repeat: 0
    };

    this.anims.create(drinkKalja);
    this.anims.create(drinkLonkero);


    const style = { font: "bold 32px Arial", fill: "#fff" };

    //  The Text is positioned at 0, 100
    text = this.add.text(750, 0, `Kalja Counter: ${kaljaCounter}`, style);
  }

  update(time, delta) {
    text.setText(
      `Kalja Counter: ${kaljaCounter}`
    );
  }
}

function drinkHandler() {
  const timeDelta = game.getTime() - lastDrink;
  if ( !(timeDelta >= drinkCooldown) ) return;

  const audio = getSound('canclick');
  audio.play();

  this.classList.add('active');

  lastDrink = game.getTime();

  if ( this.name === 'kalja' ) {
    player.play('drinkKalja');
    kaljaCounter++;

  } else {
    player.play('drinkLonkero');

    setTimeout(function () {
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

const buttons = document.querySelectorAll('.button');
buttons.forEach(button => {
  button.addEventListener('click', drinkHandler);
  button.addEventListener('transitionend', (e) => {
    // console.log(e);
    button.classList.remove('active');
  });
});

const audios = document.querySelectorAll('audio');
