import { context } from '../Canvas';
import { Observable } from '../Observable';

export const MESSAGES = {
  BAR_IS_HIT: 'BAR_IS_HIT',
  BAR_DESTROYED: 'BAR_DESTROYED',
};

const o = new Observable();
class Bar {
  x = 0;
  y = 0;
  width = 40;
  height = 20;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  update() {}

  draw() {
    context.save();
    context.fillRect(this.x, this.y, this.width, this.height);
    context.restore();
  }

  isHit() {
    o.notify(MESSAGES.BAR_IS_HIT, this);
  }
}

export default Bar;
