require('dotenv').config()
const bodyParser = require('body-parser');
const express = require('express')
const crypto = require('crypto')
const cors = require('cors')
const app = express()

class DB {
  db;

  constructor() {
    this.db = {
      users: {},
      exercises: {}
    }
  }

  getId() {
    return crypto.randomUUID();
  }

  addUser(username) {
    const id = this.getId();
    this.db.users[id] = { _id: id, username };
    return this.db.users[id];
  }

  getUser(id) {
    return this.db.users[id];
  }

  getAllUsers() {
    return Object.values(this.db.users);
  }

  addExercise(userId, exercise) {
    if (this.db.exercises[userId]) {
      this.db.exercises[userId].push(exercise);
    } else {
      this.db.exercises[userId] = [exercise];
    }

    const { _id, username } = this.db.users[userId];
    const { description, duration, date } = exercise;

    return { _id, username, description, duration, date };
  }

  getExercises(userId) {
    return this.db.exercises[userId];
  }

  ///api/users/0d22400a-6ebb-478f-bc4c-f50dd3bb5d98/logs?from=2024-10-10&to=2024-11-11&limit=1
  getLog(userId, options) {
    const { _id, username } = this.db.users[userId];
    let exercises = this.db.exercises[userId];
    const count = exercises.length;

    if (options.from) {
      exercises = exercises.filter(e => new Date(e.date) > new Date(options.from));
    }

    if (options.to) {
      exercises = exercises.filter(e => new Date(e.date) < new Date(options.to));
    }

    if (options.limit) {
      exercises = exercises.slice(0, +options.limit);
    }

    console.log(exercises);

    return {
      username,
      count,
      _id,
      log: exercises
    };
  }
}

const db = new DB();

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});



app.route('/api/users')
  .get((req, res) => {
    console.log("[GET USERS]");
    res.json(db.getAllUsers());
  })
  .post((req, res) => {
    console.log("[POST USER]", req.body);
    const newUser = db.addUser(req.body.username);
    res.json(newUser);
  });

app.post('/api/users/:_id/exercises', (req, res) => {
  console.log("[POST EXERCISE]", req.params, req.body);
  const _id = req.params._id;
  const { description, duration, date } = req.body;
  const _date = isNaN(new Date(date).getTime())
    ? new Date().toDateString()
    : new Date(date).toDateString();

  return res.json(db.addExercise(_id, { _id, description, duration: +duration, date: _date }));
});

app.get('/api/users/:_id/logs', (req, res) => {
  console.log("[GET LOGS]", req.query);
  const logs = db.getLog(req.params._id, req.query);
  res.json(logs);
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
