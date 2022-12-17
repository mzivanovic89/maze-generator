import { useState, useEffect } from 'react';
import { CELL_COLOR, CELL_SIZE, REFRESH_RATE } from './config/config';
import useInterval from './hooks/useInterval';
import useWindowDimensions from './hooks/useWindowDimensions';
import { ICell } from './types';
import { Cell, getCellBorders, getCellColor } from './utils/Cell';
import { createGrid, getGridNextCell, removeGridWallsBetween, visitGridCell } from './utils/Grid';

const App: React.FC = () => {
  const { height, width } = useWindowDimensions();

  const gridHeight = Math.floor(height / CELL_SIZE);
  const gridWidth = Math.floor(width / CELL_SIZE);

  const [grid, setGrid] = useState<ICell[][]>(() => createGrid(gridHeight, gridWidth));
  const [currentCell, setCurrentCell] = useState<ICell>(Cell(0, 0));

  const [stack, setStack] = useState<ICell[]>([]);

  const resetGrid = () => {
    setGrid(() => createGrid(gridHeight, gridWidth));
    setCurrentCell(Cell(0, 0));
    setStack([]);
  };

  // refresh grid when window resizes to fit +1/-1 row/column
  useEffect(resetGrid, [gridHeight, gridWidth]);

  const nextMove = () => {
    let nextGrid = JSON.parse(JSON.stringify(grid));

    nextGrid = visitGridCell(nextGrid, currentCell);

    const nextCell = getGridNextCell(nextGrid, currentCell);

    if (nextCell) {
      nextGrid = visitGridCell(nextGrid, nextCell);

      // add current cell to stack if it is not already there
      if (stack.filter((stackItem) => stackItem.row === currentCell.row && stackItem.col === currentCell.col).length === 0) {
        const nextStack = JSON.parse(JSON.stringify(stack));

        nextStack.push(currentCell);
        setStack(nextStack);
      }

      nextGrid = removeGridWallsBetween(nextGrid, currentCell, nextCell);

      setCurrentCell(nextCell);
    } else if (stack.length > 0) {
      const topStackElement = stack[stack.length - 1];

      setCurrentCell(topStackElement);

      const nextStack = [...stack];
      nextStack.pop();
      setStack(nextStack);
    }

    setGrid(nextGrid);
  };

  const isMainCell = (cell: ICell): boolean => {
    return cell.row === currentCell.row && cell.col === currentCell.col;
  };

  useInterval(() => {
    nextMove();
  }, REFRESH_RATE);

  return (
    <div>
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className='flex'>
          {row.map((_, colIndex) => {
            const cell = grid[rowIndex][colIndex];
            return (
              <div
                key={`${rowIndex}${colIndex}`}
                style={{
                  backgroundColor: isMainCell(cell) ? CELL_COLOR.MAIN : getCellColor(cell),
                  height: CELL_SIZE,
                  width: CELL_SIZE,
                  ...getCellBorders(cell),
                }}
              ></div>
            );
          })}
        </div>
      ))}
      {/* <button onClick={nextMove}>Next Move</button> */}
    </div>
  );
};

export default App;
