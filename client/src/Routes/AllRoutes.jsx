import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Login from "../Pages/Login/Login";
import Home from "../Pages/Home/Home.jsx";
import Signup from '../Pages/Signup/Signup.jsx'
import Posts from "../Pages/Posts/Posts";
import PrivateRoute from "../Components/PrivateRoute";
const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="signup" element={<Signup />} />
      <Route path="login" element={<Login />} />
      <Route path="posts" element={<PrivateRoute><Posts /></PrivateRoute>} />
    </Routes>
  );
};

export default AllRoutes;
