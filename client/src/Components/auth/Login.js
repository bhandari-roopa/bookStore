import React, { useContext, useState } from "react";
import Axios from "axios";
import { Link, useHistory } from "react-router-dom";
import UserContext from "./UserContext";
import ErrorMessage from "./../user/ErrorMessage";
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
  item: {
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(2),
    width: '25ch',
  },
  error:{
    justify:"left",
    color:"#ff0000",
  }
}));


export default function Login() {
  const [userName, setuserName] = useState("");
  const [userPassword, setuserPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const { getUser } = useContext(UserContext);

  const history = useHistory();

  const classes = useStyles();

  async function login(e) {
    e.preventDefault();

    const loginData = {
      userName: userName,
      userPassword: userPassword,
    };

    try {
      await Axios.post(`http://localhost:3001/user/login`, loginData);
    } catch (err) {
      if (err) {
        setErrorMessage(err.response.data.errorMessage);
    }
      return;
    }
    await getUser();
    history.push("/");
  }

  return (
      <Grid className={classes.root}>
        <h2 >Log in</h2>
        {errorMessage && (
          <div className={classes.error}>
        <ErrorMessage 
          message={errorMessage}
          clear={() => setErrorMessage(null)}
        />
        </div>
      )}
      
        <form className={classes.root} onSubmit={login}>
          <TextField id="standard-basic" type="email" className={classes.item}
            value={userName}
            onChange={(e) => setuserName(e.target.value)} label="UserName" />
          <TextField id="standard-basic" type="password" className={classes.item}
            value={userPassword}
            onChange={(e) => setuserPassword(e.target.value)} label="Password" />

          <Button className={classes.item} variant="contained" color="primary" type="submit">
            Log in</Button>
          <p>
            Don't have an account yet? <Link to="/register">Register here.</Link>
          </p>
        </form>

      </Grid>
  );
}


