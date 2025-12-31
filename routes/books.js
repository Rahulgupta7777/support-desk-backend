const express = require("express")
const router = express.Router()
const Book = require("../models/books")



router.get('/Books', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch(err) {
        console.error(err.message);
        res.send(400).send('Server Error');
    }
});

router.get('/Books/:id', async (req, res) => {
    try {
        const item = await Book.findById(req.params.id);
        res.json(item);
    } catch(err) {
        console.error(err.message);
        res.send(400).send('Server Error');
    }
});

router.post('/Books/:id', async (req, res) => {
    try {
        const { name, author } = await req.body;
        const newBook = new Book({
            name,
            author
          });

          await Book.save()
          res.json('book added!',newBook)    
    } catch(err) {  
        console.error(err.message);
        res.status(500).json('Server Error');
   }
});


router.delete('/Books/:id', async (req, res) => {
    try {
         await Book.findByIdAndDelete(req.params.id);
        res.json('book deleted.');

        } catch(err) {
          res.status(400).json('Error: ' + err);
     }
  });

  router.put('/Books/:id', async (req, res) => {
    try {
         await Book.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            author: req.body.author
        });
        res.json('book updated!');
        
    } catch(err) {
        console.error(err.message);
        res.send(400).send('Server Error');
    }
});


module.exports = router;