import React, { useState, useEffect } from "react";
import { Avatar, Grid, Paper, TextField, Typography } from "@material-ui/core";
import { AddCircleOutlineOutlined } from "@mui/icons-material";
import { Button, Input } from "@mui/material";
import {useNavigate} from "react-router-dom";

const Login = () => {
  const paperStyle = { padding: "30px 20px", width: 300, margin: "20px auto" };
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const buttonStyle = { margin: "5px auto" };

 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(()=>{
    const auth = localStorage.getItem('name');
    if(auth){
        navigate("/")
    }
  },[]);

  const handleLogin = async() => {
    console.log(email, password);
    let result = await fetch('http://localhost:8080/login',{
        method:'post',
        body:JSON.stringify({email,password}),
        headers:{
            'Content-Type':'application/json'
        }
        

    })
    result = await result.json();
    console.log(result);
    if(result.email){
        localStorage.setItem("name",JSON.stringify(result));
        navigate("/");

    }else{
        alert("please enter correct details");
    }
  };
  return (
    <Grid>
      <Paper elevation={20} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <AddCircleOutlineOutlined />
          </Avatar>

          <h2 style={headerStyle}>Login</h2>
          <Typography variant="caption">
            Please fill this form to create an account
          </Typography>
        </Grid>
        <form>
          <TextField
            fullWidth
            label="Email"
            required
            color="red"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
          />
          <TextField
            fullWidth
            label="Password"
            required
            color="red"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
          />

          <Button type="submit" variant="contained" style={buttonStyle} onClick={handleLogin}>
            Login
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};

export default Login;
