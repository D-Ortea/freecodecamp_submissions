class DancingNode {
  constructor(c, updateFn) {
    this.L = this.R = this.U = this.D = this;
    if (c) {
      this.C = c;
    }
    this.updateFn = updateFn;
  }

  // hooks node n1 below current node
  hookDown(n1) {
    n1.D = this.D;
    n1.D.U = n1;
    n1.U = this;
    this.D = n1;
    return n1;
  }

  // hooks a node n1 to the right of this node
  hookRight(n1) {
    n1.R = this.R;
    n1.R.L = n1;
    n1.L = this;
    this.R = n1;
    return n1;
  }

  unlinkLR() {
    this.L.R = this.R;
    this.R.L = this.L;
    this.updateFn(1);
  }

  relinkLR() {
    this.L.R = this.R.L = this;
    this.updateFn(1);
  }

  unlinkUD() {
    this.U.D = this.D;
    this.D.U = this.U;
    this.updateFn(1);
  }

  relinkUD() {
    this.U.D = this.D.U = this;
    this.updateFn(1);
  }
}

class ColumnNode extends DancingNode {
  constructor(n, updateFn) {
    super(null, updateFn);
    this.size = 0;
    this.name = n;
    this.C = this;
  }

  cover() {
    this.unlinkLR();
    for (let i = this.D; i != this; i = i.D) {
      for (let j = i.R; j != i; j = j.R) {
        j.unlinkUD();
        j.C.size--;
      }
    }
  }

  uncover() {
    for (let i = this.U; i != this; i = i.U) {
      for (let j = i.L; j != i; j = j.L) {
        j.C.size++;
        j.relinkUD();
      }
    }
    this.relinkLR();
  }
}



class DancingLinks {
  constructor(grid, h) {
    this.header = this.makeDLXBoard(grid);
    this.handler = h;
    this.updates = 0;
    this.solutions = 0;
    this.answer = [];
    this.solution = null;
  }

  updateFn(n) {
    this.updates += n;
  }

  search(k) {
    if (this.solution) {
      return;
    }

    if (this.header.R == this.header) {
      this.solution = this.handler.handleSolution(this.answer);
      this.solutions++;
    } else {
      let c = this.selectColumnNodeHeuristic();
      c.cover();

      for (let r = c.D; r != c; r = r.D) {
        this.answer.push(r);

        for (let j = r.R; j != r; j = j.R) {
          j.C.cover();
        }

        this.search(k + 1);

        r = this.answer.pop();
        c = r.C;

        for (let j = r.L; j != r; j = j.L) {
          j.C.uncover();
        }
      }

      c.uncover();
    }
  }

  selectColumnNodeHeuristic() {
    let min = Number.MAX_SAFE_INTEGER;
    let ret = null;
    for (let c = this.header.R; c != this.header; c = c.R) {
      if (c.size < min) {
        min = c.size;
        ret = c;
      }
    }
    return ret;
  }

  printBoard() {
    console.log("Board Config: ");
    for (let tmp = this.header.R; tmp != this.header; tmp = tmp.R) {
      for (let d = tmp.D; d != tmp; d = d.D) {
        let ret = d.C.name + " --> ";
        for (let i = d.R; i != d; i = i.R) {
          ret += i.C.name + " --> ";
        }
        console.log(ret);
      }
    }
  }

  makeDLXBoard(grid) {
    const COLS = grid[0].length;
    const ROWS = grid.length;

    let headerNode = new ColumnNode("header", this.updateFn);
    let columnNodes = [];

    for (let i = 0; i < COLS; i++) {
      let n = new ColumnNode(`${i}`, this.updateFn);
      columnNodes.push(n);
      headerNode = headerNode.hookRight(n);
    }

    headerNode = headerNode.R.C;

    for (let i = 0; i < ROWS; i++) {
      let prev = null;
      for (let j = 0; j < COLS; j++) {
        if (grid[i][j] == 1) {
          let col = columnNodes[j];
          let newNode = new DancingNode(col, this.updateFn);
          if (prev === null) {
            prev = newNode;
          }
          col.U.hookDown(newNode);
          prev = prev.hookRight(newNode);
          col.size++;
        }
      }
    }

    headerNode.size = COLS;
    return headerNode;
  }

  runSolver() {
    this.solutions = 0;
    this.updates = 0;
    this.answer = [];
    this.search(0);
    return this.solution;
  }
}

module.exports = DancingLinks;
