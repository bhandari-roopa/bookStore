import Axios from "axios";
import React from "react";
import { UserContextProvider } from "./Components/auth/UserContext";
import Router from "./Components/Router";


Axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <div className="container">
        <Router />
      </div>
    </UserContextProvider>
  );
}

export default App;
