const express = require("express")
const router = express.Router()
const Book = require("../models/books")
const fs = require('fs/promises')

router.use(express.json())

router.get('/books', async (req, res) => {
    try {
    await fs.writeFile("data.json", JSON.stringify({
    statusCode: res.statusCode,
    url: req.url,
    method: req.method,
    dirname: __dirname,
    time: new Date().toISOString()
    }), "utf-8");
        const books = await Book.find();
        res.json(books)
    } catch(err) {
        console.error(err.message);
        res.send(400).send('Server Error');
    }
});

router.get('/books/:id', async (req, res) => {
    try {
        const item = await Book.findById(req.params.id);
        const data = await fs.readFile('data.json', 'utf8');
        const dataBooks = JSON.parse(data);
         await fs.writeFile("data.json", JSON.stringify({
            statusCode: res.statusCode,
            id:req.params.id,
            url: req.url,
            method: req.method,
            dirname: __dirname,
            time: new Date().toISOString()
        }), "utf-8");
        res.json(dataBooks);
    } catch(err) {
        console.error(err.message);
        res.send(400).send('Server Error');
    }
});

router.post('/books/:id', async (req, res) => {
    try {
        
        const { name, author } = await req.body;
        const newBook = new Book({
            name,
            author
          });
           await fs.writeFile("data.json", JSON.stringify({
            statusCode: res.statusCode,
              id:req.params.id,
            url: req.url,
            method: req.method,
            dirname: __dirname,
            time: new Date().toISOString()
        }), "utf-8");

          await Book.save()
          res.json('book added!',newBook)    
    } catch(err) {  
        console.error(err.message);
        res.status(500).json('Server Error');
   }
});


router.delete('/books/:id', async (req, res) => {
    try {
         await Book.findByIdAndDelete(req.params.id);
        res.json('book deleted.');
         await fs.writeFile("data.json", JSON.stringify({
            statusCode: res.statusCode,
              id:req.params.id,
            url: req.url,
            method: req.method,
            dirname: __dirname,
            time: new Date().toISOString()
        }), "utf-8");

        } catch(err) {
          res.status(400).json('Error: ' + err);
     }
  });

  router.put('/books/:id', async (req, res) => {
    try {
         await Book.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            author: req.body.author
            
        });
         await fs.writeFile("data.json", JSON.stringify({
            statusCode: res.statusCode,
              id:req.params.id,
            url: req.url,
            method: req.method,
            dirname: __dirname,
            time: new Date().toISOString()
        }), "utf-8");
        res.json('book updated!');
        
    } catch(err) {
        console.error(err.message);
        res.send(400).send('Server Error');
    }
});


module.exports = router;