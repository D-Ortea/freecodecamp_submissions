const SudokuDLX = require('../controllers/sudoku-handler.js');
const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];

class SudokuSolver {
  stringToMatrix(puzzleString) {
    const matrix = Array(9).fill(0).map(() => Array(9).fill(0));
    const arr = puzzleString.split('');
    for (let i = 0; i < arr.length; i++) {
      const row = Math.floor(i / 9);
      const col = i % 9;
      const char = arr[i];
      matrix[row][col] = char === '.' ? 0 : +char;
    }

    return matrix;
  }

  _createMap(puzzleString) {
    const map = new Map();
    const chars = puzzleString.split('');

    for (let i = 0; i < chars.length; i++) {
      const letter = letters[Math.floor(i / 9)];
      if (!map.has(letter)) {
        map.set(letter, []);
      }

      map.get(letter).push(chars[i]);
    }

    return map;
  }

  validate(puzzleString) {
    const regex = /^[1-9.]{81}$/
    const isValid = !!puzzleString.match(regex);

    if (!isValid) {
      if (puzzleString.length != 81) {
        return { error: "Expected puzzle to be 81 characters long" };
      }
      return { error: "Invalid characters in puzzle" };
    }

    return "";
  }

  checkRowPlacement(puzzleString, row, column, value) {
    const map = this._createMap(puzzleString);
    return map.get(row.toUpperCase()).every((char, i) => i === column - 1 || char !== value);
  }

  checkColPlacement(puzzleString, row, column, value) {
    const map = this._createMap(puzzleString);
    return letters.every(letter => letter === row.toUpperCase() || map.get(letter)[+column - 1] !== value);
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    const map = this._createMap(puzzleString);
    const letterRegions = [['A', 'B', 'C'], ['D', 'E', 'F'], ['G', 'H', 'I']];
    const letterRegion = letterRegions.find(region => region.includes(row.toUpperCase()));
    const colStartIndex = Math.floor((+column - 1) / 3) * 3;

    for (const letter of letterRegion) {
      for (let i = 0; i < 3; i++) {
        if (letter === row.toUpperCase() && colStartIndex + i + 1 === +column) {
          continue;
        }

        if (map.get(letter)[colStartIndex + i] === value) {
          return false;
        }
      }
    }

    return true;
  }

  solve(puzzleString) {
    const validation = this.validate(puzzleString);
    if (validation.error) {
      return validation;
    }

    const sudoku = this.stringToMatrix(puzzleString);
    const sudokuDLX = new SudokuDLX();
    const solution = sudokuDLX.solve(sudoku);

    if (solution.error) {
      return solution;
    }

    // Returns one dimensional array
    return { solution: solution.reduce((acc, row) => [...acc, ...row], []).join('') };
  }
}

module.exports = SudokuSolver;

