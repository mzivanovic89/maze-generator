import { ICell } from '../types';
import { Cell } from './Cell';

// creates 2D array of height x width elements filled with 0's
export const createGrid = (height: number, width: number): ICell[][] => {
  const grid = new Array(height).fill(new Array(width).fill(0));

  return grid.map((row: ICell[], rowIndex) => row.map((_, colIndex) => Cell(colIndex, rowIndex)));
};

// checks if row,col pair is outside of grid
const outOfBounds = (grid: ICell[][], row: number, col: number): boolean => {
  const rowCount = grid.length;
  const colCount = grid[0].length;

  return row < 0 || row >= rowCount || col < 0 || col >= colCount;
};

export const visitGridCell = (grid: ICell[][], cell: ICell): ICell[][] => {
  if (outOfBounds(grid, cell.row, cell.col) || cell.visited) return grid;

  const nextGrid = JSON.parse(JSON.stringify(grid));
  nextGrid[cell.row][cell.col].visited = true;

  return nextGrid;
};

// removes walls between cellA and cellB if they are next to each other
export const removeGridWallsBetween = (grid: ICell[][], cellA: ICell, cellB: ICell): ICell[][] => {
  const nextGrid = JSON.parse(JSON.stringify(grid));
  const rowA = cellA.row;
  const colA = cellA.col;
  const rowB = cellB.row;
  const colB = cellB.col;

  // if the 2 cells are next to each other, remove left/right walls
  const deltaCol = colA - colB;

  if (deltaCol === 1) {
    nextGrid[rowA][colA].walls.left = false;
    nextGrid[rowB][colB].walls.right = false;
  }
  if (deltaCol === -1) {
    nextGrid[rowA][colA].walls.right = false;
    nextGrid[rowB][colB].walls.left = false;
  }

  // if the 2 cells are one on top of another, remove top/bottom walls
  const deltaRow = rowA - rowB;

  if (deltaRow === 1) {
    nextGrid[rowA][colA].walls.top = false;
    nextGrid[rowB][colB].walls.bottom = false;
  }
  if (deltaRow === -1) {
    nextGrid[rowA][colA].walls.bottom = false;
    nextGrid[rowB][colB].walls.top = false;
  }

  return nextGrid;
};

// returns random next cell option for given cell
export const getGridNextCell = (grid: ICell[][], cell: ICell): ICell => {
  const { row, col } = cell;
  const unvisitedNeighbours: ICell[] = [];

  // if cell is valid grid cell and is not visited, add it to neighbours array
  if (!outOfBounds(grid, row - 1, col) && !grid[row - 1][col].visited) unvisitedNeighbours.push(grid[row - 1][col]);
  if (!outOfBounds(grid, row, col + 1) && !grid[row][col + 1].visited) unvisitedNeighbours.push(grid[row][col + 1]);
  if (!outOfBounds(grid, row + 1, col) && !grid[row + 1][col].visited) unvisitedNeighbours.push(grid[row + 1][col]);
  if (!outOfBounds(grid, row, col - 1) && !grid[row][col - 1].visited) unvisitedNeighbours.push(grid[row][col - 1]);

  // return random element of unvisitedNeighbours
  return unvisitedNeighbours[Math.floor(Math.random() * unvisitedNeighbours.length)];
};


export const isMazeDone = (grid: ICell[][]): boolean => {
    for(let row = 0; row < grid.length; row++) {
        for(let col = 0; col <grid[0].length; col++) {
            if(!grid[row][col].visited) {
                return false;
            }
        }
    }
    return true;
}