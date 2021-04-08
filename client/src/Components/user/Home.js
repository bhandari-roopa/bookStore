import Axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Book from "./Book";
import BookEditor from "./BookEditor";
import UserContext from "../auth/UserContext";
import { Link } from "react-router-dom";
// import domain from "../../util/domain";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [bookEditorOpen, setBookEditorOpen] = useState(false);
  const [editBookData, setEditBookData] = useState(null);

  const { user } = useContext(UserContext);

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
        <button
          className="btn-editor-toggle"
          onClick={() => setBookEditorOpen(true)}
        >
          Add Book
        </button>
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
        <div className="no-user-message">
          <h2>Welcome to Book Store</h2>
          <Link to="/register">Register here</Link>
        </div>
      )}
    </div>
  );
}


