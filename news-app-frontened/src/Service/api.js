import axios from "axios";

const usersUrl = "http://localhost:8080";

export const addUser = async (user) => await axios.post(`${usersUrl}/add-news`, user);

// export const getUsers = async () => await axios.get(`${usersUrl}`);

export const getDetails = async () => await axios.get(`${usersUrl}/post`);

export const getUser = async (id) => await axios.get(`${usersUrl}/${id}`);

export const editUser = async (user, id) => await axios.put(`${usersUrl}/${id}`, user);

export const deleteUser = async(id) => await axios.delete(`${usersUrl}/${id}`)

// export const registerUser = async(formData) => await axios.post(`${usersUrl}/register`, formData);
// export const getSearch = async(key) => await axios.get(`${usersUrl}/search/${key}`)