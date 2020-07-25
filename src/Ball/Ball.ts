import { context } from '../Canvas';
import { IRect } from '../shape.type';
import { Events } from '../Events';
import { Observable } from '../Observable';
import { MESSAGES as PADDLE_MESSAGES } from '../Paddle';

const o = new Observable();

export const MESSAGES = {
  BALL_OUT: 'BALL_OUT',
};

class Ball implements IRect {
  private MAX_SPEED = 70;
  private isFired = false;
  private unsubscribe: Function = () => {};

  x = 0;
  y = 0;
  dx = 0;
  dy = -55;
  width = 10;
  height = 10;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.unsubscribe = o.subscribe(
      PADDLE_MESSAGES.POSITION_CHANGED,
      (pos: [number, number]) => this.setPosition(pos)
    );
  }

  init(): void {
    this.isFired = false;
    this.dx = 0;
    this.dy = -55;
    this.unsubscribe = o.subscribe(
      PADDLE_MESSAGES.POSITION_CHANGED,
      (pos: [number, number]) => this.setPosition(pos)
    );
  }

  setPosition(position: [number, number] = [0, 0]): void {
    const [x, y] = position;
    this.y = y;
    this.x = x;
  }

  update(dt: number): void {
    if (!this.isFired) {
      if (Events.isKeyPressed(' ')) {
        this.isFired = true;
        this.unsubscribe();
      }
      return;
    }

    this.dx = this.dx > this.MAX_SPEED ? this.MAX_SPEED : this.dx;
    this.dy = this.dy > this.MAX_SPEED ? this.MAX_SPEED : this.dy;

    if (this.y + this.height / 2 >= context.canvas.height) {
      o.notify(MESSAGES.BALL_OUT, this);
      this.init();
    }

    if (this.y - this.height / 2 <= 0) {
      this.dy = -this.dy;
    }

    if (
      this.x + this.width / 2 >= context.canvas.width ||
      this.x - this.width / 2 <= 0
    ) {
      this.dx = -this.dx;
    }

    this.y += this.dy * dt;
    this.x += this.dx * dt;
  }

  draw(): void {
    context.save();
    context.beginPath();
    context.fillStyle = '#000';
    context.arc(this.x, this.y, 5, 0, 2 * Math.PI);
    context.fill();
    context.restore();
  }
}

export default Ball;
