import Axios from "axios";
import React from "react";
// import domain from "../../util/domain";
// import "./Snippet.scss";

export default function Book({ book, getBooks, editBook }) {
  async function deleteBook() {
    if (window.confirm("Do you want to delete this Book?")) {
      await Axios.delete(`http://localhost:3001/book/${book._id}`);

      getBooks();
    }
  }

  return (
    <div className="snippet">
      {book.title && <h2 className="title">{book.title}</h2>}
      {book.description && (
        <p className="description">{book.description}</p>
      )}
      {book.author && (
        <pre className="author">
          <code>{book.author}</code>
        </pre>
      )}
      <button className="btn-edit" onClick={() => editBook(book)}>
        Edit
      </button>
      <button className="btn-delete" onClick={deleteBook}>
        Delete
      </button>
    </div>
  );
}


