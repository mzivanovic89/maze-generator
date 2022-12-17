import { BORDER_SIZE, CELL_COLOR } from '../config/config';
import { IBorderObject, ICell } from '../types';

export const Cell = (x: number, y: number): ICell => {
  return {
    col: x,
    row: y,
    visited: false,
    walls: {
      top: true,
      right: true,
      bottom: true,
      left: true,
    },
  };
};

export const getCellColor = (cell: ICell) => (cell.visited ? CELL_COLOR.VISITED : CELL_COLOR.UNVISITED);

export const getCellBorders = (cell: ICell): IBorderObject => {
  return {
    borderTop: cell.walls.top ? `${BORDER_SIZE}px solid white` : '',
    borderRight: cell.walls.right ? `${BORDER_SIZE}px solid white` : '',
    borderBottom: cell.walls.bottom ? `${BORDER_SIZE}px solid white` : '',
    borderLeft: cell.walls.left ? `${BORDER_SIZE}px solid white` : '',
  };
};
