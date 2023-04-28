import React from "react";
import { Avatar, Grid, Paper, TextField, Typography } from "@material-ui/core";
import { AddCircleOutlineOutlined } from "@mui/icons-material";
import { Button, Input } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignUp() {
  const paperStyle = { padding: "30px 20px", width: 300, margin: "20px auto" };
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const buttonStyle = { margin: "5px auto" };

  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("name");
    if (auth) {
      navigate("/");
    }
  }, []);

  const collectData = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("firstname", firstname);
    formdata.append("lastname", lastname);
    formdata.append("email", email);
    formdata.append("password", password);
    formdata.append("image", image);
    let result = await axios.post("http://localhost:8080/register", formdata, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    localStorage.setItem("name", JSON.stringify(result));
  };

  return (
    <Grid>
      <Paper elevation={20} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <AddCircleOutlineOutlined />
          </Avatar>

          <h2 style={headerStyle}>Sign Up</h2>
          <Typography variant="caption">
            Please fill this form to create an account
          </Typography>
        </Grid>
        <form onSubmit={(e) => collectData(e)} method="POST">
          <TextField
            fullWidth
            label="First Name"
            required
            color="red"
            value={firstname}
            onChange={(event) => setFirstName(event.target.value)}
            type="text"
          />
          <TextField
            fullWidth
            label="Last Name"
            required
            color="red"
            onChange={(event) => setLastName(event.target.value)}
            value={lastname}
            type="text"
          />
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
          <TextField
            fullWidth
            label="Profile Picture"
            required
            color="success"
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            name="image"
            size="lg"
          />
          {/* {preview && (
            <div>
              <img src={preview} alt="Preview" />
            </div>
          )} */}
          <button type="submit" disabled={!image}>
            Upload
          </button>

          <Button type="submit" variant="contained" style={buttonStyle}>
            SignUp
          </Button>
        </form>
      </Paper>
    </Grid>
  );
}

export default SignUp;
