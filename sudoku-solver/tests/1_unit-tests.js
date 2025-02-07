const chai = require('chai');
const assert = chai.assert;

const { puzzlesAndSolutions } = require('../controllers/puzzle-strings.js');
const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();

suite('Unit Tests', () => {
  test('Logic handles a valid puzzle string of 81 characters', function() {
    puzzlesAndSolutions.forEach(([p1, _]) => {
      assert.equal(solver.validate(p1), '');
    });
  });
  test('Logic handles a puzzle string with invalid characters (not 1-9 or .)', function() {
    const zeroes = '1.5..2.80..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
    const letters = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.a..9.47...8..1..16....926914.31b';
    assert.deepEqual(solver.validate(zeroes), { error: "Invalid characters in puzzle" });
    assert.deepEqual(solver.validate(letters), { error: "Invalid characters in puzzle" });
  });
  test('Logic handles a puzzle string that is not 81 characters in length', function() {
    const len80 = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37';
    const len82 = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.1';
    assert.deepEqual(solver.validate(''), { error: "Expected puzzle to be 81 characters long" });
    assert.deepEqual(solver.validate('.'), { error: "Expected puzzle to be 81 characters long" });
    assert.deepEqual(solver.validate(len80), { error: "Expected puzzle to be 81 characters long" });
    assert.deepEqual(solver.validate(len82), { error: "Expected puzzle to be 81 characters long" });
  });
  test('Logic handles a valid row placement', function() {
    const puzzleString = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
    assert.isTrue(solver.checkRowPlacement(puzzleString, 'A', '1', '2'));
    assert.isTrue(solver.checkRowPlacement(puzzleString, 'A', '1', '3'));
    assert.isTrue(solver.checkRowPlacement(puzzleString, 'A', '1', '4'));
    assert.isTrue(solver.checkRowPlacement(puzzleString, 'A', '1', '6'));
    assert.isTrue(solver.checkRowPlacement(puzzleString, 'A', '1', '7'));
    assert.isTrue(solver.checkRowPlacement(puzzleString, 'A', '1', '8'));
  });
  test('Logic handles an invalid row placement', function() {
    const puzzleString = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
    assert.isFalse(solver.checkRowPlacement(puzzleString, 'A', '1', '1'));
    assert.isFalse(solver.checkRowPlacement(puzzleString, 'A', '1', '5'));
    assert.isFalse(solver.checkRowPlacement(puzzleString, 'A', '1', '9'));
  });
  test('Logic handles a valid column placement', function() {
    const puzzleString = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
    assert.isTrue(solver.checkColPlacement(puzzleString, 'A', '1', '2'));
    assert.isTrue(solver.checkColPlacement(puzzleString, 'A', '1', '3'));
    assert.isTrue(solver.checkColPlacement(puzzleString, 'A', '1', '7'));
    assert.isTrue(solver.checkColPlacement(puzzleString, 'A', '1', '9'));

  });
  test('Logic handles an invalid column placement', function() {
    const puzzleString = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
    assert.isFalse(solver.checkColPlacement(puzzleString, 'A', '1', '1'));
    assert.isFalse(solver.checkColPlacement(puzzleString, 'A', '1', '4'));
    assert.isFalse(solver.checkColPlacement(puzzleString, 'A', '1', '5'));
    assert.isFalse(solver.checkColPlacement(puzzleString, 'A', '1', '6'));
    assert.isFalse(solver.checkColPlacement(puzzleString, 'A', '1', '8'));
  });
  test('Logic handles a valid region (3x3 grid) placement', function() {
    const puzzleString = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
    assert.isTrue(solver.checkRegionPlacement(puzzleString, 'A', '1', '1'));
    assert.isTrue(solver.checkRegionPlacement(puzzleString, 'A', '1', '6'));
    assert.isTrue(solver.checkRegionPlacement(puzzleString, 'A', '1', '7'));
  });
  test('Logic handles an invalid region (3x3 grid) placement', function() {
    const puzzleString = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
    assert.isFalse(solver.checkRegionPlacement(puzzleString, 'A', '1', '2'));
    assert.isFalse(solver.checkRegionPlacement(puzzleString, 'A', '1', '3'));
    assert.isFalse(solver.checkRegionPlacement(puzzleString, 'A', '1', '4'));
    assert.isFalse(solver.checkRegionPlacement(puzzleString, 'A', '1', '5'));
    assert.isFalse(solver.checkRegionPlacement(puzzleString, 'A', '1', '8'));
    assert.isFalse(solver.checkRegionPlacement(puzzleString, 'A', '1', '9'));
  });
  test('Valid puzzle strings pass the solver', function() {
    puzzlesAndSolutions.forEach(([puzzle]) => {
      const solutionObj = solver.solve(puzzle);
      assert.hasAnyKeys(solutionObj, ['solution']);
      assert.doesNotHaveAnyKeys(solutionObj, ['error']);
    });

  })
  test('Invalid puzzle strings fail the solver', function() {
    const invalidChars = 'A6.5.4.3.1...9...2.........9...5...6.4.6.2.7.7...4...5.........4...8...1.5.2.3.4.';
    const len80 = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37';
    const len82 = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.1';
    const noSolution = '.6.5.4.3.1...9...4.........9...5...6.4.6.2.7.7...4...5.........4...8...1.5.2.3.44';
    const puzzles = [
      { puzzle: invalidChars, error: "Invalid characters in puzzle" },
      { puzzle: len80, error: "Expected puzzle to be 81 characters long" },
      { puzzle: len82, error: "Expected puzzle to be 81 characters long" },
      { puzzle: noSolution, error: "Puzzle cannot be solved" }
    ];
    puzzles.forEach(({ puzzle, error }) => {
      const solutionObj = solver.solve(puzzle);
      assert.doesNotHaveAnyKeys(solutionObj, ['solution']);
      assert.hasAnyKeys(solutionObj, ['error']);
      assert.equal(solutionObj.error, error);
    });

  })
  test('Solver returns the expected solution for an incomplete puzzle', function() {
    puzzlesAndSolutions.forEach(([puzzle, solution]) => {
      const solutionObj = solver.solve(puzzle);
      assert.equal(solutionObj.solution, solution);
    });
  })
});
