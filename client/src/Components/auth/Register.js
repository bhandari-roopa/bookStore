import Axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import UserContext from "../auth/UserContext";
// import domain from "../../util/domain";
// import ErrorMessage from "../misc/ErrorMessage";


function Register() {
  const [userName, setuserName] = useState("");
  const [userPassword, setuserPassword] = useState("");
  const [userPasswordVerify, setuserPasswordVerify] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);


  const history = useHistory();

  async function register(e) {
    e.preventDefault();

    const registerData = {
      userName :  userName,
       password:  userPassword, 
       confirmPassword : userPasswordVerify,
    };

    try {
      await Axios.post(`http://localhost:3001/user/`, registerData);
    } catch (err) {
      if (err.response) {
        if (err.response.data.errorMessage) {
          setErrorMessage(err.response.data.errorMessage);
        }
      }
      return;
    }
    history.push("/");
  }

  return (
    <div className="auth-form">
      <h2>Register a new account</h2>
      {errorMessage}
      <form className="form" onSubmit={register}>
        <label htmlFor="form-email">Email</label>
        <input
          id="form-email"
          type="email"
          value={userName}
          onChange={(e) => setuserName(e.target.value)}
        />

        <label htmlFor="form-password">Password</label>
        <input
          id="form-password"
          type="password"
          value={userPassword}
          onChange={(e) => setuserPassword(e.target.value)}
        />

        <label htmlFor="form-passwordVerify">Verify password</label>
        <input
          id="form-passwordVerify"
          type="password"
          value={userPasswordVerify}
          onChange={(e) => setuserPasswordVerify(e.target.value)}
        />

        <button className="btn-submit" type="submit">
          Register
        </button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login instead</Link>
      </p>
    </div>
  );
}

export default Register;
