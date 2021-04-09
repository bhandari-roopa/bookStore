import Axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Book from "./Book";
import BookEditor from "./BookEditor";
import UserContext from "../auth/UserContext";
import { Link } from "react-router-dom";
// import domain from "../../util/domain";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: 'column',
    alignItems: "center",
    justify: "center"
  },
  button:{
    marginTop:"20px",
    marginBottom:"20px",
  }
}));

export default function Home() {
  const [books, setBooks] = useState([]);
  const [bookEditorOpen, setBookEditorOpen] = useState(false);
  const [editBookData, setEditBookData] = useState(null);

  const { user } = useContext(UserContext);
  const classes = useStyles();

  useEffect(() => {
    if (!user) setBooks([]);
    else getBooks();
  }, [user]);

  async function getBooks() {
    const bookRes = await Axios.get(`http://localhost:3001/book/`);
    setBooks(bookRes.data);
  }

  function editBook(bookData) {
    setEditBookData(bookData);
    setBookEditorOpen(true);
  }

  function renderBooks() {
    let sortedBooks = [...books];
    sortedBooks = sortedBooks.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return sortedBooks.map((book, i) => {
      return (
        <Book
          key={i}
          book={book}
          getBooks={getBooks}
          editBook={editBook}
        />
      );
    });
  }

  return (
    <div className="home">
      {!bookEditorOpen && user && (
        <Button color="primary" variant="contained" className={classes.button} 
          onClick={() => setBookEditorOpen(true)}
        > Add Book</Button>
      )}
      {bookEditorOpen && (
        <BookEditor
          setBookEditorOpen={setBookEditorOpen}
          getBooks={getBooks}
          editBookData={editBookData}
        />
      )}
      {books.length > 0
        ? renderBooks()
        : user && (
            <p className="no-snippets-msg">No books have been added yet.</p>
          )}
      {user === null && (
      <Grid className={classes.root}>
      <h2>Welcome to Book Store</h2>
          <Link to="/register">Register here</Link>
      </Grid>
      )}
    </div>
  );
}


