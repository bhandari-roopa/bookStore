import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  error:{
    display: "flex",
    flexDirection: 'row',
    justify:"left",
  }
}));
function ErrorMessage({ message, clear }) {
  const classes = useStyles();
  return (
    <div className={classes.error}>
      <p >{message}
        <DeleteIcon onClick={clear}></DeleteIcon>
        </p>
    </div>
  );
}

export default ErrorMessage;