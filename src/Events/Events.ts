let PRESSED_KEYS: Record<string, boolean> = {
  A: false,
  S: false,
  D: false,
  W: false,
};

const KEYS = {
  W: 'W',
  A: 'A',
  S: 'S',
  D: 'D',
  SPACE: ' ',
};

document.onkeydown = (event: KeyboardEvent): void => {
  const uppercaseKey = event.key.toUpperCase() || '';
  if (uppercaseKey === KEYS.W) {
    PRESSED_KEYS[uppercaseKey] = true;
  }
  if (uppercaseKey === KEYS.A) {
    PRESSED_KEYS[uppercaseKey] = true;
  }
  if (uppercaseKey === KEYS.S) {
    PRESSED_KEYS[uppercaseKey] = true;
  }
  if (uppercaseKey === KEYS.D) {
    PRESSED_KEYS[uppercaseKey] = true;
  }
  if (uppercaseKey === KEYS.SPACE) {
    PRESSED_KEYS[uppercaseKey] = true;
  }
};

document.onkeyup = (event: KeyboardEvent): void => {
  const uppercaseKey = event.key.toUpperCase() || '';
  if (uppercaseKey === KEYS.W) {
    PRESSED_KEYS[uppercaseKey] = false;
  }
  if (uppercaseKey === KEYS.A) {
    PRESSED_KEYS[uppercaseKey] = false;
  }
  if (uppercaseKey === KEYS.S) {
    PRESSED_KEYS[uppercaseKey] = false;
  }
  if (uppercaseKey === KEYS.D) {
    PRESSED_KEYS[uppercaseKey] = false;
  }
  if (uppercaseKey === KEYS.SPACE) {
    PRESSED_KEYS[uppercaseKey] = false;
  }
};

const isKeyPressed = (key: string): boolean => PRESSED_KEYS[key.toUpperCase()];

export default {
  isKeyPressed,
};
