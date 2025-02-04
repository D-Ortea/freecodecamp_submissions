/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';
const { Book } = require('../db/db');
const mongoose = require('mongoose');

module.exports = function(app) {

  app.route('/api/books')
    .get(async function(req, res) {
      await mongoose.connect(process.env.MONGO_URI);

      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
      const books = await Book.find({});
      res.json(books);
    })

    .post(async function(req, res) {
      await mongoose.connect(process.env.MONGO_URI);

      let title = req.body.title;
      //response will contain new book object including atleast _id and title
      if (!title) {
        return res.send('missing required field title');
      }

      const book = await Book.create({ title });
      res.json(book);
    })

    .delete(async function(req, res) {
      await mongoose.connect(process.env.MONGO_URI);

      //if successful response will be 'complete delete successful'
      try {
        await Book.deleteMany({});
        res.send('complete delete successful');
      } catch (err) {
        console.log(err);
        res.send('failed deleting all books');
      }
    });



  app.route('/api/books/:id')
    .get(async function(req, res) {
      await mongoose.connect(process.env.MONGO_URI);

      let bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
      try {
        const book = await Book.findOne({ _id: bookid });
        if (!book) {
          return res.send('no book exists');
        }

        res.json(book);
      } catch (err) {
        res.send('no book exists');
      }
    })

    .post(async function(req, res) {
      await mongoose.connect(process.env.MONGO_URI);

      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get
      try {
        if (!comment) {
          return res.send('missing required field comment');
        }

        const book = await Book.findOne({ _id: bookid });
        if (!book) {
          return res.send('no book exists');
        }

        book.comments.push(comment);
        book.commentcount += 1;
        await book.save();

        res.json(book);
      } catch (err) {
        res.send('no book exists');
      }
    })

    .delete(async function(req, res) {
      await mongoose.connect(process.env.MONGO_URI);

      let bookid = req.params.id;
      //if successful response will be 'delete successful'
      try {
        const book = await Book.findOne({ _id: bookid });
        if (!book) {
          return res.send('no book exists');
        }

        await book.deleteOne().exec();
        res.send('delete successful');
      } catch (err) {
        return res.send('no book exists');
      }
    });

};
