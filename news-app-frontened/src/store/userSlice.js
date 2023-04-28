import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = "http://localhost:8080";
export const addUser = createAsyncThunk(
  "post/addUser",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseURL}/add-news`, user);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUsers = createAsyncThunk(
  "post/getUsers",
  async (id = null, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseURL}`);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const getDetails = createAsyncThunk(
  "post/getDetails",
  async (id = null, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseURL}/post`);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const getUser = createAsyncThunk(
  "post/getUser",
  async (id = null, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseURL}/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const editUser = createAsyncThunk(
  "post/editUser",
  async (user,id, { rejectWithValue }) => {
    try {
      // const { id, image, title, description} = user;

      // const response = await axios.put(`${baseURL}/${id}`,{
      //   image, title, description
      // });
      const response = await axios.put(`${baseURL}/${id}`, user);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data);
    }
  }
);



export const deleteUser = createAsyncThunk(
  "post/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${baseURL}/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data);
    }
  }
);

const postSlice = createSlice({
  name: "post",
  reducers: {},
  initialState: {
    post: [],
    addNewsStatus: "",
    addNewsError: "",
    getNewsStatus: "",
    getNewsError: "",
    deleteNewsStatus: "",
    deleteNewsError: "",
    updateNewsStatus: "",
    updateNewsError: "",
  },
  extraReducers: {
    [addUser.pending]: (state, action) => {
      return {
        ...state,
        addNewsStatus: "pending",
        addNewsError: "",
        getNewsStatus: "",
        getNewsError: "",
        deleteNewsStatus: "",
        deleteNewsError: "",
        updateNewsStatus: "",
        updateNewsError: "",
      };
    },
    [addUser.fulfilled]: (state, action) => {
      // state.todos.push(action.payload);
      return {
        ...state,
        post: [action.payload, ...state.post],
        addNewsStatus: "success",
        addNewsError: "",
        getNewsStatus: "",
        getNewsError: "",
        deleteNewsStatus: "",
        deleteNewsError: "",
        updateNewsStatus: "",
        updateNewsError: "",
      };
    },
    [addUser.rejected]: (state, action) => {
      return {
        ...state,
        addNewsStatus: "rejected",
        addNewsError: action.payload,
        getNewsStatus: "",
        getNewsError: "",
        deleteNewsStatus: "",
        deleteNewsError: "",
        updateNewsStatus: "",
        updateNewsError: "",
      };
    },
    [getUsers.pending]: (state, action) => {
      return {
        ...state,
        addNewsStatus: "",
        addNewsError: "",
        getNewsStatus: "pending",
        getNewsError: "",
        deleteNewsStatus: "",
        deleteNewsError: "",
        updateNewsStatus: "",
        updateNewsError: "",
      };
    },
    [getUsers.fulfilled]: (state, action) => {
      return {
        ...state,
        post: action.payload,
        addNewsStatus: "",
        addNewsError: "",
        getNewsStatus: "success",
        getNewsError: "",
        deleteNewsStatus: "",
        deleteNewsError: "",
        updateNewsStatus: "",
        updateNewsError: "",
      };
    },
    [getUsers.rejected]: (state, action) => {
      return {
        ...state,
        addNewsStatus: "",
        addNewsError: "",
        getNewsStatus: "rejected",
        getNewsError: action.payload,
        deleteNewsStatus: "",
        deleteNewsError: "",
        updateNewsStatus: "",
        updateNewsError: "",
      };
    },
    [deleteUser.pending]: (state, action) => {
      return {
        ...state,
        addNewsStatus: "",
        addNewsError: "",
        getNewsStatus: "",
        getNewsError: "",
        deleteNewsStatus: "pending",
        deleteNewsError: "",
        updateNewsStatus: "",
        updateNewsError: "",
      };
    },
    [deleteUser.fulfilled]: (state, action) => {
      const currentTodos = state.post.filter(
        (todo) => todo._id !== action.payload._id
      );
      return {
        ...state,
        post: currentTodos,
        addNewsStatus: "",
        addNewsError: "",
        getNewsStatus: "",
        getNewsError: "",
        deleteNewsStatus: "success",
        deleteNewsError: "",
        updateNewsStatus: "",
        updateNewsError: "",
      };
    },
    [deleteUser.rejected]: (state, action) => {
      state = {
        ...state,
        addNewsStatus: "",
        addNewsError: "",
        getNewsStatus: "",
        getNewsError: "",
        deleteNewsStatus: "rejected",
        deleteNewsError: action.payload,
        updateNewsStatus: "",
        updateNewsError: "",
      };
    },
    [editUser.pending]: (state, action) => {
      return {
        ...state,
        addNewsStatus: "",
        addNewsError: "",
        getNewsStatus: "",
        getNewsError: "",
        deleteNewsStatus: "",
        deleteNewsError: "",
        updateNewsStatus: "pending",
        updateNewsError: "",
      };
    },
    [editUser.fulfilled]: (state, action) => {
      const updatedTodos = state.post.map((todo) =>
        todo._id === action.payload._id ? action.payload : todo
      );
      return {
        ...state,
        post: updatedTodos,
        addNewsStatus: "",
        addNewsError: "",
        getNewsStatus: "",
        getNewsError: "",
        deleteNewsStatus: "",
        deleteNewsError: "",
        updateNewsStatus: "success",
        updateNewsError: "",
      };
    },
    [editUser.rejected]: (state, action) => {
      return {
        ...state,
        addNewsStatus: "",
        addNewsError: "",
        getNewsStatus: "",
        getNewsError: "",
        deleteNewsStatus: "",
        deleteNewsError: "",
        updateNewsStatus: "rejected",
        updateNewsError: action.payload,
      };
    },
  },
});

export default postSlice.reducer;
