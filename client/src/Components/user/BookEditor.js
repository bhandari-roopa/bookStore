import React, { useEffect, useState } from "react";
import Axios from "axios";
import ErrorMessage from "./ErrorMessage";
// import domain from "../../util/domain";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import { FormGroup } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: 'column',
    alignItems: "center",
    justify: "center"
  },
  group:{
    display: "flex",
    flexDirection: 'row',
    alignItems: "center",
    justify: "center"
  },
  item: {
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(2),
    width: '25ch',
  },
  title: {
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(2),
    width: '20ch',
  },
  error:{
    justify:"left",
    color:"#ff0000",
  }
}));


export default function BookEditor({ getBooks, setBookEditorOpen, editBookData }) {
  const [editorTitle, setEditorTitle] = useState("");
  const [editorDescription, setEditorDescription] = useState("");
  const [editorAuthor, setEditorAuthor] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const classes = useStyles();

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
      if (err) {
        setErrorMessage(err.response.data.error);
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
    <Grid className={classes.root}>
  {errorMessage && (
     <div className={classes.error}>
        <ErrorMessage
          message={errorMessage}
          clear={() => setErrorMessage(null)}
        />
        </div>
      )}
      <form className={classes.root} onSubmit={saveBook}>
      <FormGroup className={classes.group} >
        <FormLabel className={classes.title}>Title</FormLabel>
       
        <TextField
          className={classes.item}
          type="text"
          value={editorTitle}
          onChange={(e) => setEditorTitle(e.target.value)}
        />

        </FormGroup>
        <FormGroup className={classes.group}>
        <FormLabel className={classes.title} >Author</FormLabel>
        <TextField className={classes.item}
          value={editorAuthor}
          onChange={(e) => setEditorAuthor(e.target.value)}
        />
        </FormGroup>
        <FormGroup className={classes.group}>
        <FormLabel className={classes.title}>Description</FormLabel>
        <TextField
         className={classes.item}
          type="text"
          value={editorDescription}
          onChange={(e) => setEditorDescription(e.target.value)} multiline rows={4}
        />
        </FormGroup>
        <FormGroup className={classes.group}>
        <Button className={classes.item} variant="contained" color="primary" type="submit">
          Save
        </Button>
        <Button className={classes.item} variant="contained" color="primary" type="button" onClick={closeEditor}>
          Cancel
        </Button>
        </FormGroup>
      </form>
    </Grid>
  );
}


