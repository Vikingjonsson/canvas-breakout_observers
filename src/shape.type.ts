type Shape = {
  x: number;
  y: number;
};

export type Rect = {
  width: number;
  height: number;
} & Shape;

export type Circle = {
  radius: number;
} & Shape;

export interface IRect {
  x: number;
  y: number;
  width: number;
  height: number;
}
