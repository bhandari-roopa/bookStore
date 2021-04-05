const router = require('express').Router();
const Book = require('../models/bookModel');
const auth = require('../middleware/auth')

router.get("/", auth, async (req, res) => {
    try {
      const books = await Book.find({ user: req.user });
      res.json(books);
    } catch (err) {
      res.status(500).send();
    }
  });

router.post("/",auth, async(req,res)=>{
    try {
        const { title , description } =req.body;
        if(!title || !description){
            res.status(500).json({error:'all fields are required'})
        }

        const newBook = new Book({title , description})
        const savedBook = await newBook.save();
        res.send(savedBook)
    } catch (error) {
        res.status(500).send();
        
    }

})

module.exports = router;