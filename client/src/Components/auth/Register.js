import Axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import UserContext from "../auth/UserContext";
// import domain from "../../util/domain";
 import ErrorMessage from "../user/ErrorMessage";
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

function Register() {
  const [userName, setuserName] = useState("");
  const [userPassword, setuserPassword] = useState("");
  const [userPasswordVerify, setuserPasswordVerify] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);


  const history = useHistory();

  const classes = useStyles();

  async function register(e) {
    e.preventDefault();

    const registerData = {
      userName: userName,
      password: userPassword,
      confirmPassword: userPasswordVerify,
    };

    try {
      await Axios.post(`http://localhost:3001/user/`, registerData)
    } catch (err) {
      if (err) {
          setErrorMessage(err.response.data.errorMessage);
      }
      return;
    }
    history.push("/login");
  }

  return (
    <div className="auth-form">
      <Grid className={classes.root}>
        <h2>Register a new account</h2>
        {errorMessage && (
           <div className={classes.error}>
        <ErrorMessage className={classes.error}
          message={errorMessage}
          clear={() => setErrorMessage(null)}
        />
        </div>
      )}
        <form className={classes.root} onSubmit={register}>

          <TextField id="standard-basic" type="email" className={classes.item}
            value={userName}
            onChange={(e) => setuserName(e.target.value)} label="UserName" />

          <TextField id="standard-basic" type="password" className={classes.item}
            value={userPassword}
            onChange={(e) => setuserPassword(e.target.value)} label="password" />

          <TextField id="standard-basic" type="password" className={classes.item}
            value={userPasswordVerify}
            onChange={(e) => setuserPasswordVerify(e.target.value)} label=" Verify password" />

          <Button className={classes.item} variant="contained" color="primary" type="submit">
            Register</Button>
          <p>
            Already have an account? <Link to="/login">Login instead</Link>
          </p>
        </form>

      </Grid>
    </div>
  );
}

export default Register;
