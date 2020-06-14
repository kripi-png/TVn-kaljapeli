const [ spawnX, spawnY ] = [ 1024/2, 600/2 ];

let lastDrink = 0;
const drinkCooldown = 1000;

let player;

class Kaljapeli extends Phaser.Scene {
  constructor() {
    super();
  }

  preload() {
    this.load.spritesheet('TV', '/_Game/assets/images/TV.png', { frameWidth: 150, frameHeight: 300 });
    this.load.spritesheet('drinkKalja', '/_Game/assets/images/drinkKalja.png', { frameWidth: 150, frameHeight: 300, endFrame: 4 });
    this.load.spritesheet('drinkLonkero', '/_Game/assets/images/drinkLonkero.png', { frameWidth: 150, frameHeight: 300, endFrame: 4 });
    this.load.image('background', '/_Game/assets/images/background.png');
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


  }

  update(time, delta) {

  }

}

function drinkHandler() {
  const timeDelta = game.getTime() - lastDrink;
  if ( !(timeDelta >= drinkCooldown) ) return;

  this.classList.add('active');

  lastDrink = game.getTime();

  if ( this.name === 'kalja' ) {
    player.play('drinkKalja');







  } else {
    player.play('drinkLonkero');







  }
}

const gameSettings = {
  height: 600,
  type: Phaser.WEBGL,
  parent: 'game-canvas',
  scene: Kaljapeli
}

const game = new Phaser.Game(gameSettings);

window.onload=()=>{
  const buttons = document.querySelectorAll('.button');
  buttons.forEach(button => {
    button.addEventListener('click', drinkHandler);
    button.addEventListener('transitionend', (e) => {
      // console.log(e);
      button.classList.remove('active');
    });
  });
};
