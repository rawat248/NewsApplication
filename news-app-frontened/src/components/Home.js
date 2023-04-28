import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useState, useEffect, useMemo } from "react";
import { getUsers } from "../Service/api";
import { makeStyles } from "@mui/styles";
// import {useDispatch, useSelector} from "react-redux";
// import {getUsers} from "../store/userSlice";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
// import { useNavigate  } from "react-router-dom";
import axios from "axios";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  cards: {
    margin: "70px auto auto auto",
    width: "50%",
  },
  search: {
    marginTop: "15px",
    marginRight: "350px",
  },
});

const LIMIT = 6;

const totalPagesCalculator = (total, limit) => {
  const pages = [];
  for (let x = 1; x <= parseInt(total) / limit; x++) {
    pages.push(x);
  }

  return pages;
};

const Home = () => {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);

  // const dispatch = useDispatch();
  // const item = useSelector((state)=>state.app);
  // const {post} = item;

  const searchHandle = async (event) => {
    let key = event.target.value;

    if (key) {
      let result = await fetch(`http://localhost:8080/search/${key}`);
      result = await result.json();
      if (result) {
        setUsers(result);
      }
    } else {
      getAllUsers();
    }
  };
  // const navigate = useNavigate();
  // const searchHandler = (e, navigate, searchInput) => {
  //   e.preventDefault();
  //   e.currentTarget.reset();
  //   const url = `/search/${searchInput}`;
  //   navigate(url);
  // };

  // const searchHandle = (event)=>{
  //   setUsers(event.target.value);
  // }

  useEffect(() => {
    // dispatch(getUsers());
    getAllUsers();
  }, [activePage]);

  // const getAllUsers = async () => {
  //   let response = await getUsers();
  //   setUsers(response.data);
  // };

  const getAllUsers = () =>
    axios
      .get("http://localhost:8080", {
        params: {
          page: activePage,
          size: LIMIT,
        },
      })
      .then(({ data }) => {
        setUsers(data.records);
        setTotalUsers(data.total);
      })
      .catch((error) => {
        console.log(error.response);
      });

  return (
    <div>
      <div
        className={classes.search}
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        <Paper
          component="form"
          sx={{
            display: "flex",
            alignItems: "center",
            width: 400,
            margin: " auto 60px auto auto ",
            border: "1px solid black",
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search news"
            inputProps={{ "aria-label": "search google maps" }}
            onChange={(event) => searchHandle(event)}
          />

          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </div>
      <div>
        <div className={classes.root}>
          {users.length > 0 ? (
            users.map((user) => {
              return (
                <div className={classes.cards} key={user._id}>
                  <Card
                    sx={{ display: "flex", width: "400px", height: "200px" }}
                  >
                    <CardMedia
                      component="img"
                      sx={{
                        width: "200px",
                        height: "200px",
                        objectFit: "contain",
                      }}
                      image={user.image}
                      alt="Live from space album cover"
                    />
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <CardContent sx={{ flex: "1 0 auto" }}>
                        <Typography component="div">
                          {user.description}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          component="div"
                        >
                          {user.title}
                        </Typography>
                      </CardContent>
                    </Box>
                  </Card>
                </div>
              );
            })
          ) : (
            <h1>No news found</h1>
          )}
        </div>
      </div>
      <ul>
        {totalPagesCalculator(totalUsers, LIMIT).map((page) => (
          <li key={page}>
            <a href="#" onClick={() => setActivePage(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Home;
