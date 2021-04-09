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
        const { title , author, description } =req.body;
        if(!title || !author){
            res.status(400).json({error:'Title and author are required'})
        }

        const newBook = new Book({title ,author, description,  user: req.user,})

        const savedBook = await newBook.save();
        res.json(savedBook);
      
    } catch (error) {
        res.status(500).send();
        
    }

})
router.put("/:id", auth, async (req, res) => {
    try {
      const { title, description, author } = req.body;
      const bookId = req.params.id;
  
    
  
      if (!description && !author) {
        return res.status(400).json({
          errorMessage: "You need to enter at least a description or author.",
        });
      }
  
      if (!bookId)
        return res.status(400).json({
          errorMessage: "Book ID not given. Please contact the developer.",
        });
  
      const originalBook = await Book.findById(bookId);
      if (!originalBook)
        return res.status(400).json({
          errorMessage:
            "No Book with this ID was found. Please contact the developer.",
        });
  
      if (originalBook.user.toString() !== req.user)
        return res.status(401).json({ errorMessage: "Unauthorized." });
  
        originalBook.title = title;
        originalBook.description = description;
        originalBook.author = author;
  
      const savedBook = await originalBook.save();
  
      res.json(savedBook);
    } catch (err) {
      res.status(500).send();
    }
  });
router.delete("/:id", auth, async (req, res) => {
  try {
    const bookId = req.params.id;

    // validation

    if (!bookId)
      return res.status(400).json({
        errorMessage: "Book ID not given. Please contact the developer.",
      });

    const existingBook = await Book.findById(bookId);
    
    if (!existingBook)
      return res.status(400).json({
        errorMessage:
          "No Book with this ID was found. Please contact the developer.",
      });

    if (existingBook.user.toString() !== req.user)
      return res.status(401).json({ errorMessage: "Unauthorized." });

    await existingBook.delete();

    res.json(existingBook);
  } catch (err) {
    res.status(500).send();
  }
});

module.exports = router;