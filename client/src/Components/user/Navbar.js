import Axios from "axios";
import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import UserContext from "../auth/UserContext";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
// import domain from "../../util/domain";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));
function Navbar() {
  const { user, getUser } = useContext(UserContext);
  const history = useHistory();

  async function logOut() {
    await Axios.get(`http://localhost:3001/user/logOut`);
    await getUser();
  }
  const classes = useStyles();
  return (
   
       <AppBar position="static">
       <Toolbar>
         <Typography className={classes.title}>
         <Button color="inherit" onClick={()=>{history.push("/") }}> Book Store </Button>
           </Typography>
          
      {user === null ? (
        <>     
         <Button color="inherit" onClick={()=>{ history.push("/login")}  }> Login </Button>
         <Button color="inherit" onClick={()=>{history.push("/register") }}> Register </Button>    
        </>
      ) : (
        user && (
          <Button color="inherit" onClick={logOut}>Logout</Button>
        )    
        )}
     </Toolbar>
        </AppBar>
  );
}

export default Navbar;
