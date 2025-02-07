'use strict';

const SudokuSolver = require('../controllers/sudoku-solver');

module.exports = function(app) {

  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      const { puzzle, coordinate, value } = req.body;
      if (!puzzle || !coordinate || !value) {
        return res.json({ error: 'Required field(s) missing' });
      }

      const coordRegex = /^[A-I][1-9]$/i;
      if (!coordinate.match(coordRegex)) {
        return res.json({ error: "Invalid coordinate" });
      }

      if (!value.match(/^[1-9]$/)) {
        return res.json({ error: "Invalid value" });
      }

      const isInvalid = solver.validate(puzzle);

      if (isInvalid) {
        return res.json(isInvalid);
      }

      let valid = true;
      const conflict = [];
      const [row, col] = [coordinate[0], coordinate[1]];
      if (!solver.checkRowPlacement(puzzle, row, col, value)) {
        valid = false;
        conflict.push("row");
      };
      if (!solver.checkColPlacement(puzzle, row, col, value)) {
        valid = false;
        conflict.push("column");
      }
      if (!solver.checkRegionPlacement(puzzle, row, col, value)) {
        valid = false;
        conflict.push("region");
      }

      if (!valid) {
        return res.json({ valid, conflict });
      }

      res.json({ valid });

    });

  app.route('/api/solve')
    .post((req, res) => {
      const puzzle = req.body.puzzle;
      if (!puzzle) {
        return res.json({ error: 'Required field missing' });
      }
      res.json(solver.solve(puzzle));
    });
};
