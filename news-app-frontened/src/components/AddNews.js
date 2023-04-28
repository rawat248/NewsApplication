import React, { useState } from "react";
import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Button,
  styled,
  Typography,
  Alert,
} from "@mui/material";
import { addUser } from "../Service/api";
import { useNavigate } from "react-router-dom";
// import {useDispatch, useSelector} from "react-redux";
// import {addUser} from "../store/userSlice";

const Container = styled(FormGroup)`
    width: 50%;
    margin: 5% 0 0 25%;
    & > div {
        margin-top: 20px;
`;

const initialValue = {
  image: "",
  title: "",
  description: "",
};
function AddNews() {
  const [user, setUser] = useState(initialValue);
  const [error, setError] = useState(false);
  const { image, title, description } = user;
  // const dispatch = useDispatch();
  // const items = useSelector((state)=>state.app);

  let navigate = useNavigate();
  const searchHandle = () => {};
  const onValueChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const addNewsDetails = async () => {
    if (!image || !title || !description) {
      setError(true);
      return false;
    }
    await addUser(user);
    // dispatch(addUser(user));
    navigate("/");
  };
  return (
    <Container >
      <Typography variant="h4">Add News</Typography>
      <FormControl>
        <InputLabel htmlFor="my-input">Image</InputLabel>
        <Input onChange={(e) => onValueChange(e)} name="image" value={image} />
        {error && !image && (
          <Typography color="red">Enter valid name</Typography>
        )}
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="my-input">Title</InputLabel>
        <Input onChange={(e) => onValueChange(e)} name="title" value={title} />
        {error && !title && (
          <Typography color="red">Enter valid title</Typography>
        )}
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="my-input">Description</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="description"
          value={description}
        />
        {error && !description && (
          <Typography color="red">Enter valid description</Typography>
        )}
      </FormControl>
      <FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={() => addNewsDetails()}
        >
          Add News
        </Button>
        {/* {
          items.addNewsStatus === 'rejected'? (<Alert severity="error">{items.addNewsError}</Alert>):null
        } */}
      </FormControl>
    </Container>
  );
}

export default AddNews;
