import { Events } from '../Events';
import { context } from '../Canvas';
import { IRect } from '../shape.type';
import { Observable } from '../Observable';

export const MESSAGES = {
  POSITION_CHANGED: 'POSITION_CHANGED',
};

const o = new Observable();
class Paddle implements IRect {
  x = 0;
  y = 0;
  width = 96;
  height = 12;
  speed = 48;

  constructor() {
    this.x = context.canvas.width / 2 - this.width / 2;
    this.y = context.canvas.height - this.height - 12;
  }

  update(dt: number): void {
    const [x, y] = this.getCenter();
    o.notify(MESSAGES.POSITION_CHANGED, [x, y - 20]);

    if (Events.isKeyPressed('a')) {
      this.x <= 0 ? (this.x = 0) : (this.x -= this.speed * dt);
    }

    if (Events.isKeyPressed('d')) {
      const MAX_WIDTH = context.canvas.width - this.width;
      this.x >= MAX_WIDTH ? (this.x = MAX_WIDTH) : (this.x += this.speed * dt);
    }
  }

  draw(): void {
    context.save();
    context.fillRect(this.x, this.y, this.width, this.height);
    context.restore();
  }

  getPosition(): [number, number] {
    return [this.x, this.y];
  }

  getCenter(): [number, number] {
    return [this.x + this.width / 2, this.y + this.height / 2];
  }
}

export default Paddle;
