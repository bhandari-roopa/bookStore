import React, { useContext, useState } from "react";
import Axios from "axios";
import { Link, useHistory } from "react-router-dom";
import UserContext from "./UserContext";
export default function Login() {
  const [userName, setuserName] = useState("");
  const [userPassword, setuserPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const { getUser } = useContext(UserContext);

  const history = useHistory();

  async function login(e) {
    e.preventDefault();

    const loginData = {
      userName: userName,
      userPassword: userPassword,
    };

    try {
      await Axios.post(`http://localhost:3001/user/login`, loginData);
    } catch (err) {
      if (err.response) {
        if (err.response.data.errorMessage) {
          setErrorMessage(err.response.data.errorMessage);
        }
      }
      return;
    }
    await getUser();
    history.push("/");
  }

  return (
    <div className="auth-form">
      <h2>Log in</h2>
      {errorMessage }
      <form className="form" onSubmit={login}>
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

        <button className="btn-submit" type="submit">
          Log in
        </button>
      </form>
      <p>
        Don't have an account yet? <Link to="/register">Register here.</Link>
      </p>
    </div>
  );
}


