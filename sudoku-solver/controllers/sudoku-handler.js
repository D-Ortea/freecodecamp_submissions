const DancingLinks = require('./dancing-links.js');


class SudokuDLX {
  constructor() {
    this.S = 9; // Size of the board
    this.side = 3; // box side length
  }

  solve(sudoku) {
    if (!this.validateSudoku(sudoku)) {
      // console.log("Error: Invalid sudoku. Aborting...");
      return { error: "Puzzle cannot be solved" };
    }

    this.S = sudoku.length;
    this.side = Math.sqrt(this.S);
    return this.runSolver(sudoku);
  }

  printSolution(result) {
    let N = result.length;
    for (let i = 0; i < N; i++) {
      let ret = "";
      for (let j = 0; j < N; j++) {
        ret += result[i][j] + " ";
      }
      console.log(ret);
    }
    console.log();
  }

  makeExactCoverGrid(sudoku) {
    const R = this.sudokuExactCover();
    for (let i = 1; i <= this.S; i++) {
      for (let j = 1; j <= this.S; j++) {
        let n = sudoku[i - 1][j - 1];
        if (n != 0) { // zero out in the constraint board
          for (let num = 1; num <= this.S; num++) {
            if (num != n) {
              R[this.getIdx(i, j, num)] = Array(9 * 9 * 4).fill(0);
            }
          }
        }
      }
    }
    return R;
  }

  sudokuExactCover() {
    const R = Array(9 * 9 * 9).fill(0).map(() => Array(9 * 9 * 4).fill(0));
    let hBase = 0;

    // row-column constraints
    for (let r = 1; r <= this.S; r++) {
      for (let c = 1; c <= this.S; c++, hBase++) {
        for (let n = 1; n <= this.S; n++) {
          R[this.getIdx(r, c, n)][hBase] = 1;
        }
      }
    }

    // row-number constraints
    for (let r = 1; r <= this.S; r++) {
      for (let n = 1; n <= this.S; n++, hBase++) {
        for (let c1 = 1; c1 <= this.S; c1++) {
          R[this.getIdx(r, c1, n)][hBase] = 1;
        }
      }
    }

    // column-number constraints

    for (let c = 1; c <= this.S; c++) {
      for (let n = 1; n <= this.S; n++, hBase++) {
        for (let r1 = 1; r1 <= this.S; r1++) {
          R[this.getIdx(r1, c, n)][hBase] = 1;
        }
      }
    }

    // box-number constraints

    for (let br = 1; br <= this.S; br += this.side) {
      for (let bc = 1; bc <= this.S; bc += this.side) {
        for (let n = 1; n <= this.S; n++, hBase++) {
          for (let rDelta = 0; rDelta < this.side; rDelta++) {
            for (let cDelta = 0; cDelta < this.side; cDelta++) {
              R[this.getIdx(br + rDelta, bc + cDelta, n)][hBase] = 1;
            }
          }
        }
      }
    }

    return R;
  }

  getIdx(row, col, num) {
    return (row - 1) * this.S * this.S + (col - 1) * this.S + (num - 1);
  }

  runSolver(sudoku) {
    const cover = this.makeExactCoverGrid(sudoku);
    const dlx = new DancingLinks(cover, new SudokuHandler(this.S));
    return dlx.runSolver();
  }

  validateSudoku(grid) {
    if (grid.length != 9) {
      return false;
    }

    // Checks that is a 9x9 grid
    for (let i = 0; i < grid.length; i++) {
      if (grid[i].length != grid.length) {
        return false;
      }
    }

    let N = grid.length;
    let b = new Array(N + 1).fill(false);

    // Check rows
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        if (grid[i][j] == 0) {
          continue;
        }
        // If there is a repeated number in the row
        if (b[grid[i][j]]) {
          return false;
        }
        b[grid[i][j]] = true;
      }
      b = new Array(N + 1).fill(false);
    }

    // Check columns
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        if (grid[j][i] == 0) {
          continue;
        }
        // If there is a repeated number in the column
        if (b[grid[j][i]]) {
          return false;
        }
        b[grid[j][i]] = true;
      }
      b = new Array(N + 1).fill(false);
    }

    // Check boxes
    for (let i = 0; i < N; i += this.side) {
      for (let j = 0; j < N; j += this.side) {
        for (let d1 = 0; d1 < this.side; d1++) {
          for (let d2 = 0; d2 < this.side; d2++) {
            if (grid[i + d1][j + d2] === 0) {
              continue;
            }
            // If there is a repeated number in the box
            if (b[i + d1][j + d2]) {
              return false;
            }
            b[grid[i + d1][j + d2]] = true;
          }
        }
        b = new Array(N + 1).fill(false);
      }
    }

    return true;
  }
}

class SudokuHandler {
  constructor(boardSize) {
    this.size = boardSize || 9;
  }

  handleSolution(answer) {
    return this.parseBoard(answer);
  }

  parseBoard(answer) {
    const result = Array(this.size).fill(0).map(() => Array(this.size).fill(0));
    for (const n of answer) {
      let rcNode = n;
      let min = parseInt(rcNode.C.name);
      for (let tmp = n.R; tmp != n; tmp = tmp.R) {
        let val = parseInt(tmp.C.name);
        if (val < min) {
          min = val;
          rcNode = tmp;
        }
      }
      let ans1 = parseInt(rcNode.C.name);
      let ans2 = parseInt(rcNode.R.C.name);
      let r = Math.floor(ans1 / this.size);
      let c = ans1 % this.size;
      let num = (ans2 % this.size) + 1;
      result[r][c] = num;
    }
    return result;
  }
}

module.exports = SudokuDLX;
