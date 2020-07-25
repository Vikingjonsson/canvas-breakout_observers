import { context } from '../Canvas';

class Game {
  static instance: Game | null = null;
  lastRender = 0;
  isInitialized = false;
  updateCb: (dt: number) => void = () => {};
  drawCb: () => void = () => {};

  constructor() {
    if (Game.instance != null) {
      return Game.instance;
    }
    Game.instance = this;
    return Game.instance;
  }

  init(cb: () => void) {
    if (!this.isInitialized) {
      cb();
      this.isInitialized = true;
      console.log('game init');
    }
  }

  update(cb: (dt: number) => void): void {
    this.updateCb = cb;
  }

  draw(cb: () => void): void {
    this.drawCb = cb;
  }

  loop(cb: () => void) {
    cb();
  }
}

export default Game;
