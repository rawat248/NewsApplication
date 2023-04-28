import * as React from "react";
import { AppBar, Toolbar, styled } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/news2.jpg";



const Header = styled(AppBar)`
  background: #fff;
`;

const Tabs = styled(NavLink)`
  color: #000;
  margin-right: 20px;
  text-decoration: none;
  font-size: 20px;
`;
const Tab = styled(NavLink)`
  text-decoration: none;
  font-size: 20px;
  margin: 5px;
  padding: 4px;
  display: block;
`;

const Tabb = styled("div")`
    width: "50px",
    height: "50px",
`;

const useStyles = makeStyles({
  root: {
    width: "50px",
    height: "50px",
    margin: "auto auto auto 6px",

    "& img": {
      width: "100%",
      height: "100%",
      borderRadius: "50%",
    },
  },
});

function NavBar() {
  const classes = useStyles();
  const navigate = useNavigate();
  const auth = localStorage.getItem("name");
  const logout = () => {
    console.log("logout");
    localStorage.clear();
    navigate("/register");
  };

  return (
    <div>
      <Header position="static">
        <Toolbar>
          <div className={classes.root}>
            <img src={logo} alt="globe" className={classes.picture} />
          </div>
          <Tabs to="/">Home</Tabs>
          <Tabs to="/post">Posts</Tabs>

          <Tabs to="/add-news">Add News</Tabs>

          <Tabs to="/profile">Avatar</Tabs>

          {auth ? (
            <Tabs to="/register" onClick={logout}>
              Logout({JSON.parse(auth).firstname})
            </Tabs>
          ) : (
            <>
              <Tabs to="/register">Signup</Tabs> <Tabs to="/login">Login</Tabs>
            </>
          )}
        </Toolbar>
      </Header>
    </div>
  );
}

export default NavBar;
