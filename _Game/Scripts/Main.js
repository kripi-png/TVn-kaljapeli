class Kaljapeli extends Phaser.Scene {
  constructor() {
    super();
  }

  preload() {
    this.load.image('TV', '/_Game/assets/images/TV.png');
    this.load.image('background', '/_Game/assets/images/background.png');
  }

  create() {

  }

  update(time, delta) {

  }
}

const gameSettings = {
  height: 600,
  type: Phaser.WEBGL,
  parent: 'game-canvas',
  scene: Kaljapeli
}

export const game = new Phaser.Game(gameSettings);

export const kaljaButton = document.querySelector('#kaljaButton');
kaljaButton.addEventListener('click', () => Kaljapeli.drinkHandler('kalja'));
export const lonkeroButton = document.querySelector('#lonkeroButton');
lonkeroButton.addEventListener('click', () => Kaljapeli.drinkHandler('lonkero'));
