import React, { useState, useEffect } from "react";
import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Button,
  styled,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { editUser, getUser } from "../Service/api";
// import { editUser,getUser } from "../store/userSlice";
// import {useDispatch, useSelector} from "react-redux";

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
function EditNews() {
  const [user, setUser] = useState(initialValue);
  // const {image,title,description} = user;
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    loadUserDetails();
    //  dispatch(getUser(id));
  }, []);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const response = await dispatch(getUser(id));
  //     setUser(response.payload);
  //   };
  //   fetchUser();
  // }, [dispatch, id]);

  const loadUserDetails = async () => {
    const response = await getUser(id);
    setUser(response.data);
  };

  const onValueChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const editNewsDetails = async () => {
    // await dispatch (editUser(id,user));
    await editUser(user,id);
    navigate("/post");
  };
  console.log(user);

  return (
    <Container>
      <Typography variant="h4">Edit News</Typography>
      <FormControl>
        <InputLabel htmlFor="my-input">Image</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="image"
          value={user.image}
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="my-input">Title</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="title"
          value={user.title}
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="my-input">Description</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="description"
          value={user.description}
        />
      </FormControl>
      <FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={() => editNewsDetails()}
        >
          Edit News
        </Button>
      </FormControl>
    </Container>
  );
}

export default EditNews;
