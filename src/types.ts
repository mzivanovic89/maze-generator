export interface IWalls {
  top: boolean;
  right: boolean;
  bottom: boolean;
  left: boolean;
}

export interface ICell {
  col: number;
  row: number;
  visited: boolean;
  walls: IWalls;
}

export interface IBorderObject {
  borderTop: string;
  borderRight: string;
  borderBottom: string;
  borderLeft: string;
}

export interface WindowDimensionsObject {
  height: number;
  width: number;
}
