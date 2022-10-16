import React from "react";
import {
  FormControl,
  FormLabel,
  Box,
  Input,
  Button,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  loginFailure,
  loginRequest,
  loginSuccess,
} from "../../Redux/auth/action";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Navbar from "../../Components/Navbar/Navbar";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();

  const [loginUser, setLoginUser] = useState({});

  const handleLoginInput = (e) => {
    let { name, value } = e.target;
    setLoginUser({ ...loginUser, [name]: value });
  };

  const handleLoginBtn = (e) => {
    e.preventDefault();
    dispatch(loginRequest());
    axios
      .post(`/user/login`, loginUser)
      .then((res) => {
        console.log(res);
        if (res.data.token) {
          console.log(1);
          dispatch(loginSuccess(res.data));
          toast({
            position: "top",
            title: "Login Successful!",
            status: "success",
            duration: 4000,
            isClosable: true,
          });
          navigate("/posts");
        }
        else{
          toast({
            position: "top",
            title: "Login Failed!",
            status: "error",
            duration: 4000,
            isClosable: true,
          });
        }
      })
      .catch((err) => {
        dispatch(loginFailure());
      });
  };

  const handleBtn = () => {
    toast({
      position: "top",
      title: "Please Login",
      status: "warning",
      duration: 4000,
      isClosable: true,
    });
  };

  return (
    <Box w="100%" h="auto">
      <Navbar handleButton={handleBtn}></Navbar>
      <Box
        w="31%"
        h="400px"
        borderRadius="10px"
        // border="1px solid red"
        m="auto"
        mt="10rem"
        boxShadow="lg"
        p="6"
        rounded="md"
      >
        <Heading textAlign="center">Login</Heading>

        <FormControl isRequired mb="1rem">
          <FormLabel>Username</FormLabel>
          <Input
            onChange={handleLoginInput}
            type="email"
            name="username"
            placeholder="Username"
          />
        </FormControl>
        <FormControl isRequired mb="1rem">
          <FormLabel>Password</FormLabel>
          <Input
            onChange={handleLoginInput}
            type="password"
            name="password"
            placeholder="Password"
          />
        </FormControl>
        <Button onClick={handleLoginBtn} colorScheme="teal" variant="outline">
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
