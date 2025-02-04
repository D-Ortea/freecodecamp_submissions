const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  comments: { type: [String], default: [] },
  commentcount: { type: Number, default: 0 }
});

Book = mongoose.model('Book', bookSchema);

module.exports = { Book };
