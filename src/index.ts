import { Game } from './Game';
import { Paddle } from './Paddle';
import { Bar, MESSAGES as BAR_MESSAGES } from './Bar';
import { Ball, MESSAGES as BALL_MESSAGES } from './Ball';
import { context } from './Canvas';
import { IRect } from './shape.type';
import { Observable } from './Observable';

let score = 0;
let lives = 3;
const o = new Observable();
o.subscribe(BALL_MESSAGES.BALL_OUT, () => lives--);
o.subscribe(BAR_MESSAGES.BAR_IS_HIT, () => score++);

const hasCollided = (a: IRect, b: IRect): boolean => {
  if (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  ) {
    return true;
  }
  return false;
};

const paddle = new Paddle();
const [x, y] = paddle.getCenter();
const ball = new Ball(x, y - 20);

let bars: Bar[][] = [];
const initBars = () => {
  let padding = 5;
  for (let col = 0; col < 10; col++) {
    bars[col] = [];
    for (let row = 0; row < 3; row++) {
      bars[col].push(new Bar(padding + 50 * col, padding + 30 * row));
    }
  }
};

const update = (dt: number): void => {
  paddle.update(dt);
  ball.update(dt);

  bars.forEach((col: Bar[], i: number) => {
    col.forEach((bar: Bar, j: number) => {
      if (hasCollided(ball, bar)) {
        bar.isHit();
        bars[i] = [...col.slice(0, j), ...col.slice(j + 1)];
        ball.dy = -ball.dy;
      }
    });
  });

  if (hasCollided(ball, paddle)) {
    ball.dy = -ball.dy * 1.05;
    ball.dx = ball.dx * 1.05;
    const [x, y] = paddle.getCenter();
    const offset = paddle.width / 6;
    const outerOffset = paddle.width / 3;

    if (ball.x < x - offset) {
      ball.dx = -10;
    }

    if (ball.x > x + offset) {
      ball.dx = 10;
    }

    if (ball.x < x - outerOffset) {
      ball.dx = -15;
    }

    if (ball.x > x + outerOffset) {
      ball.dx = 15;
    }

    if (ball.x < x - outerOffset) {
      ball.dx = -15;
    }

    if (ball.x > x + 10) {
      ball.dx * 0.5;
    }

    if (ball.x > x - 10) {
      ball.dx * 0.5;
    }

    ball.dx *= Math.random();
  }
};

const draw = (): void => {
  paddle.draw();
  ball.draw();
  bars.forEach((col) => col.forEach((row: Bar) => row.draw()));
  context.fillText(`Score: ${score}`, 20, context.canvas.height - 20);
};

let lastRender = 0;
const loop = (timestamp: number) => {
  const deltaTime = (timestamp - lastRender) / 100;
  lastRender = timestamp;

  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  update(deltaTime);
  draw();

  if (window) {
    window.requestAnimationFrame(loop);
  }
};

const game = new Game();
game.loop(() => {
  game.init(() => {
    initBars();
  });

  if (window) {
    window.requestAnimationFrame(loop);
  }
});
