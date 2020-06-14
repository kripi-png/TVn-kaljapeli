class Ripoff extends Phaser.Scene {
  constructor() {
    super();
  }

  preload() {
    this.load.image('TV', '/_Game/assets/sprites/TV.png')
    this.load.image('background', '/_Game/assets/images/TV.png')
  }

  create() {

  }

  update(time, delta) {

  }
}

gameSettings = {
  type: Phaser.WEBGL,
  parent: 'phaser-example',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  scene: Ripoff'
}

export default const game = new Phaser.Game(gameSettings);
