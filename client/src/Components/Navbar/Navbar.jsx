import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import FileBase64 from "react-file-base64";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { Link as Routerlink, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { createPosts, getPosts } from "../../Redux/posts/action";

const Navbar = (props) => {
  console.log(props);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const [postDetails, setPostDetails] = useState({
    quesError: "",
  });

  const handleChange = (e) => {
    let { name, value } = e.target;
    setPostDetails({ ...postDetails, [name]: value });
  };

  const handleButton = (e) => {
    e.preventDefault();
    if (postDetails) {
      if (postDetails.quesError === "") {
        toast({
          position: "top",
          title: "Oops you forget to input the question",
          status: "warning",
          duration: 4000,
          isClosable: true,
        });
      } else {
        const payload = {
          quesFile: postDetails.quesFile,
          quesError: postDetails.quesError,
          ansError: postDetails.ansError,
          ansFile: postDetails.ansFile,
          userId: postDetails.userId,
        };
        // console.log(payload);
        dispatch(createPosts(payload)).then(() => dispatch(getPosts()));
        // dispatch(createPosts(payload))
        onClose();
        navigate("/posts");
      }
    }
  };

  // const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Box
      w="100%"
      top="0"
      maxH="60px"
      boxShadow="md"
      p="2"
      pos="fixed"
      mb="1rem"
      bgColor="white"
      zIndex="2"
    >
      <Box
        w="96%"
        h="auto"
        // border="1px solid red"
        m="auto"
      >
        <Flex justifyContent="space-between">
          <Routerlink to="/">
            <Text fontSize="32px"> ErrorBuddy </Text>
          </Routerlink>
          <Box>
            <Flex p="1">
              {props.show === false ? (
                <>
                  <Routerlink to="/">
                    <Button colorScheme="blue" mr="1rem">
                      Logout
                    </Button>
                  </Routerlink>
                </>
              ) : (
                <>
                  <Routerlink to="/signup">
                    <Button colorScheme="blue" mr="1rem">
                      Signup
                    </Button>
                  </Routerlink>
                  <Routerlink to="/login">
                    <Button colorScheme="blue" mr="1rem">
                      Login
                    </Button>
                  </Routerlink>
                </>
              )}
              {props.handleButton.name &&
              // props.handleButton.name === "handleBtn" ? (
              props.handleButton.name === "handleButton" ? (
                <Button onClick={props.handleButton}>Post Error</Button>
              ) : (
                <>
                  <Button onClick={onOpen}>Post Error</Button>
                  <Modal
                    initialFocusRef={initialRef}
                    finalFocusRef={finalRef}
                    isOpen={isOpen}
                    onClose={onClose}
                  >
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>Post Error</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody pb={6}>
                        <FormControl mt={4}>
                          <FormLabel>Error Question Image</FormLabel>
                          <FileBase64
                            type="file"
                            name="quesFile"
                            // onChange={handleChange}
                            multiple={false}
                            onDone={({ base64 }) =>
                              setPostDetails({
                                ...postDetails,
                                quesFile: base64,
                              })
                            }
                          />
                        </FormControl>
                        {/* </form> */}
                        <FormControl mt={4}>
                          <FormLabel>Error Question</FormLabel>
                          <Textarea
                            isRequired
                            type="text"
                            name="quesError"
                            onChange={handleChange}
                            ref={initialRef}
                            placeholder="Error Question"
                          />
                        </FormControl>

                        <FormControl mt={4}>
                          <FormLabel>Error Answer</FormLabel>
                          <Textarea
                            type="text"
                            name="ansError"
                            onChange={handleChange}
                            placeholder="Error Answer"
                          />
                        </FormControl>

                        <FormControl mt={4}>
                          <FormLabel>Error Answer Image</FormLabel>
                          <FileBase64
                            type="file"
                            name="ansFile"
                            // onChange={handleChange}
                            multiple={false}
                            onDone={({ base64 }) =>
                              setPostDetails({
                                ...postDetails,
                                ansFile: base64,
                              })
                            }
                          />
                        </FormControl>

                        {/* <FormControl mt={4} method="post" enctype="multipart/form-data">
                      <FormLabel>Error Answer Image</FormLabel>
                      <Input name='ansFile' onChange={handleChange} type="file" placeholder="Error Question Image" />
                    </FormControl> */}

                        {/* <FormControl mt={4}>
                      <FormLabel>Error Answer Links</FormLabel>
                      <Input placeholder="Error Answer Links" />
                    </FormControl> */}
                      </ModalBody>

                      <ModalFooter>
                        {/* <Flex w='30%' justifyContent='space-between' border='1px solid black'> */}

                        <Button
                          onClick={handleButton}
                          colorScheme="blue"
                          mr={3}
                        >
                          Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                        {/* </Flex> */}
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                </>
              )}
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default Navbar;
