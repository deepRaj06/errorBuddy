import React from "react";
import {
  FormControl,
  FormLabel,
  Box,
  Input,
  Button,
  Heading,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import {
  getUsers,
  signupFailure,
  signupRequest,
  signupSuccess,
} from "../../Redux/auth/action";
import { useDispatch, useSelector } from "react-redux";
import signupImg from "../../Images/signupImg.jpg";
import { useEffect } from "react";
import Navbar from "../../Components/Navbar/Navbar";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const [user, setUser] = useState({
    name: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    let { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSignUp = (e) => {
    e.preventDefault();

    // Checking whether username already exists

    let checkUsername = usersData.map((userInfo) => {
      return userInfo.username;
    });

    if (checkUsername.includes(user.username)) {
      toast({
        title: `${user.username} already registered`,
        description: "Please signup with different Username",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
    }

    // Validation for empty fields

    if (user.name === "") {
      toast({
        title: "Please fill your name",
        description: "Few steps away from creating an account",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    }
    if (user.username === "") {
      toast({
        title: "Please fill your username",
        description: "Few steps away from creating an account",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    }
    if (user.password === "" && !checkUsername.includes(user.username)) {
      toast({
        title: "Please fill your password",
        description: "Few steps away from creating an account",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    }

    // Validation if two different fields are unique

    if (user.name && user.username) {
      if (user.name === user.username) {
        toast({
          description: "Oops you have typed the same username as name",
          status: "warning",
          duration: 4000,
          isClosable: true,
          position: "bottom",
        });
      }
    }

    if (user.name && user.password) {
      if (user.name === user.password) {
        toast({
          description: "Oops you have typed the same password as name",
          status: "warning",
          duration: 4000,
          isClosable: true,
          position: "bottom",
        });
      }
    }

    if (user.username && user.password) {
      if (user.username === user.password) {
        toast({
          description: "Oops you have typed the same password as username",
          status: "warning",
          duration: 4000,
          isClosable: true,
          position: "bottom",
        });
      }
    }

    // Validation for strong password
    const lowercase = new RegExp("(?=.*[a-z])");
    const uppercase = new RegExp("(?=.*[A-Z])");
    const numeric = new RegExp("(?=.*[0-9])");
    const splChar = new RegExp("(?=.*[!@#$%^$*])");
    const eightLetter = new RegExp("(?=.{8,})");

    if (user.password) {
      if (!lowercase.test(user.password)) {
        toast({
          description: "Please include lowercase in your password",
          status: "warning",
          duration: 4000,
          isClosable: true,
          position: "top",
        });
      }
      if (!uppercase.test(user.password)) {
        toast({
          description: "Please include uppercase in your password",
          status: "warning",
          duration: 4000,
          isClosable: true,
          position: "top",
        });
      }
      if (!numeric.test(user.password)) {
        toast({
          description: "Please include numeric in your password",
          status: "warning",
          duration: 4000,
          isClosable: true,
          position: "top",
        });
      }
      if (!splChar.test(user.password)) {
        toast({
          description: "Please include splChar in your password",
          status: "warning",
          duration: 4000,
          isClosable: true,
          position: "top",
        });
      }
      if (!eightLetter.test(user.password)) {
        toast({
          description: "Please include eightLetter in your password",
          status: "warning",
          duration: 4000,
          isClosable: true,
          position: "top",
        });
      }
    }

    // Validation if all are filled

    if (
      user.name &&
      user.username &&
      lowercase.test(user.password) &&
      uppercase.test(user.password) &&
      numeric.test(user.password) &&
      splChar.test(user.password) &&
      eightLetter.test(user.password)
    ) {
      toast({
        title: "Hurray! All fields are filled!",
        description: "One step away from creating an account",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    }
    // console.log(user.name)

    // Dspatching signupDetails

    dispatch(signupRequest());
    axios
      .post(`/user/signup`, user)
      .then((res) => {
        console.log(res);
        console.log(res.config.data);

        if (res.data) {
          dispatch(signupSuccess(res.data));
          navigate("/login");
        }
      })
      .catch((err) => {
        dispatch(signupFailure());
      });
  };

  const handleBtn = () => {
    toast({
      position: "top",
      title: "Please Signup",
      status: "warning",
      duration: 4000,
      isClosable: true,
    });
  };

  // Logic applied for getting username

  const { usersData } = useSelector((store) => store.AuthReducer);
  // console.log(usersData);

  useEffect(() => {
    if (usersData.length === 0) {
      dispatch(getUsers());
    }
  }, [usersData.length]);

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
        <Heading textAlign="center">Signup</Heading>
        <FormControl isRequired mb="1rem">
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            name="name"
            onChange={handleChange}
            placeholder="Name"
          />
        </FormControl>
        <FormControl isRequired mb="1rem">
          <FormLabel>Username</FormLabel>
          <Input
            type="email"
            name="username"
            onChange={handleChange}
            placeholder="Username"
          />
        </FormControl>
        <FormControl isRequired mb="1rem">
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="Password"
          />
        </FormControl>
        {/* <Routerlink to="/login"> */}
        <Button
          w="100%"
          colorScheme="teal"
          variant="outline"
          onClick={handleSignUp}
        >
          Signup
        </Button>
        {/* </Routerlink> */}
      </Box>
    </Box>
  );
};

export default Signup;
