import React, { useEffect, useState } from "react";
import Axios from "axios";
// import "./SnippetEditor.scss";
// import ErrorMessage from "../misc/ErrorMessage";
// import domain from "../../util/domain";

export default function BookEditor({ getBooks, setBookEditorOpen, editBookData }) {
  const [editorTitle, setEditorTitle] = useState("");
  const [editorDescription, setEditorDescription] = useState("");
  const [editorAuthor, setEditorAuthor] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (editBookData) {
      setEditorTitle(editBookData.title ? editBookData.title : "");
      setEditorDescription(
        editBookData.description ? editBookData.description : ""
      );
      setEditorAuthor(editBookData.author ? editBookData.author : "");
    }
  }, [editBookData]);

  async function saveBook(e) {
    e.preventDefault();

    const bookData = {
      title: editorTitle ? editorTitle : undefined,
      description: editorDescription ? editorDescription : undefined,
      author: editorAuthor ? editorAuthor : undefined,
    };

    try {
      if (!editBookData) await Axios.post(`http://localhost:3001/book/`, bookData);
      else
        await Axios.put(
          `http://localhost:3001/book/${editBookData._id}`,
          bookData
        );
    } catch (err) {
      if (err.response) {
        if (err.response.data.errorMessage) {
          setErrorMessage(err.response.data.errorMessage);
        }
      }
      return;
    }

    getBooks();
    closeEditor();
  }

  function closeEditor() {
    setBookEditorOpen(false);
    setEditorAuthor("");
    setEditorDescription("");
    setEditorTitle("");
  }

  return (
    <div className="snippet-editor">
      {errorMessage
    //    && (
    //     <ErrorMessage
    //       message={errorMessage}
    //       clear={() => setErrorMessage(null)}
    //     />
    //   )
      }
      <form className="form" onSubmit={saveBook}>
        <label htmlFor="editor-title">Title</label>
        <input
          id="editor-title"
          type="text"
          value={editorTitle}
          onChange={(e) => setEditorTitle(e.target.value)}
        />

        <label htmlFor="editor-description">Description</label>
        <input
          id="editor-description"
          type="text"
          value={editorDescription}
          onChange={(e) => setEditorDescription(e.target.value)}
        />

        <label htmlFor="editor-code">Code</label>
        <textarea
          id="editor-code"
          value={editorAuthor}
          onChange={(e) => setEditorAuthor(e.target.value)}
        />

        <button className="btn-save" type="submit">
          Save
        </button>
        <button className="btn-cancel" type="button" onClick={closeEditor}>
          Cancel
        </button>
      </form>
    </div>
  );
}


