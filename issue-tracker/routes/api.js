'use strict';
const { connectToDatabase, Project } = require('../db/db');
const mongoose = require('mongoose');

module.exports = function(app) {

  app.route('/api/issues/:project')

    .get(async function(req, res) {
      await mongoose.connect(process.env.MONGO_URI);
      const name = req.params.project;

      if (!name) { res.json({ error: 'Invalid project name' }); }

      let project = await Project.findOne({ name });

      if (!project) {
        return res.json([]);
      }

      const filters = req.query;
      if (filters.open) {
        filters.open = filters.open === 'false' ? false : true;
      }

      const issues = project.issues.filter(issue =>
        Object.keys(filters).reduce((acc, k) => acc && issue[k] == filters[k], true)
      );

      return res.json(issues);
    })

    .post(async function(req, res) {
      await mongoose.connect(process.env.MONGO_URI);
      const name = req.params.project;
      if (!name) { res.json({ error: 'Invalid project name' }); }

      const issue = req.body;

      if (!issue.issue_title || !issue.issue_text || !issue.created_by) {
        return res.json({ error: 'required field(s) missing' });
      }

      issue.open = true;
      let project = await Project.findOne({ name });

      if (!project) {
        project = new Project({ name, issues: [] });
      }

      project.issues.push(issue);
      await project.save();

      res.json(project.issues[project.issues.length - 1]);
    })

    .put(async function(req, res) {
      await mongoose.connect(process.env.MONGO_URI);
      const name = req.params.project;
      if (!name) { res.json({ error: 'Invalid project name' }); }

      const issue = req.body;

      if (!issue || !issue._id) {
        return res.json({ error: 'missing _id' });
      }

      let project = await Project.findOne({ name });
      const { _id, ...data } = issue;
      if (Object.keys(data).length === 0) {
        return res.json({ error: 'no update field(s) sent', _id });
      }

      const issueIndex = project.issues.findIndex(i => i._id == _id);

      if (issueIndex === -1) {
        return res.json({ error: 'could not update', _id });
      }

      project.issues.set(issueIndex, Object.assign(project.issues.id(_id), data));
      await project.save();

      res.json({ result: 'successfully updated', _id });
    })

    .delete(async function(req, res) {
      await mongoose.connect(process.env.MONGO_URI);
      const name = req.params.project;
      if (!name) { res.json({ error: 'Invalid project name' }); }

      const issue = req.body;

      if (!issue || !issue._id) {
        return res.json({ error: 'missing _id' });
      }

      let project = await Project.findOne({ name });
      const issueIndex = project.issues.findIndex(i => i._id == issue._id);

      if (issueIndex === -1) {
        return res.json({ error: 'could not delete', _id: issue._id });
      }

      project.issues.id(issue._id).deleteOne();
      await project.save()

      return res.json({ result: 'successfully deleted', _id: issue._id });
    });

};
