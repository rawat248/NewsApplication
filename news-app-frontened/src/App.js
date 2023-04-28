import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Posts from "./components/Posts";
import AddNews from "./components/AddNews";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Avatar from "./components/Avatar";
import Home from "./components/Home";
import EditNews from "./components/EditNews";
import PrivateComponent from "./components/PrivateComponent";
import Logout from "./components/Logout";

function App() {
  return (
    <div style={{ fontFamily: "Poppins, sans-serif" }}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<PrivateComponent />}>
            <Route path="/post" element={<Posts />} />
            <Route path="/add-news" element={<AddNews />} />
            <Route path="/edit-news/:id" element={<EditNews />} />
            <Route path="/profile" element={<Avatar />} />
            <Route path="/logout" element={<Logout />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
