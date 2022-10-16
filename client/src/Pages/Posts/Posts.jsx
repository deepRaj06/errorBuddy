import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import Sample1 from "../../Images/Sample1.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Navbar from "../../Components/Navbar/Navbar.jsx";
import { deletePosts, getPosts } from "../../Redux/posts/action";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import Edit_Post from "../../Components/Edit Post/Edit_Post";
import FullPost from "../../Components/Full Post/FullPost";

const Posts = () => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();
  // const postsData = useSelector((store) => store.PostsReducer.postsData)
  const { postsData } = useSelector((store) => store.PostsReducer);
  // console.log(store)
  // console.log(postsData);
  const errorMsg = useSelector((store) => store.PostsReducer.errorMsg);
  // console.log(errorMsg)
  const user = JSON.parse(localStorage.getItem("user"));
  // console.log(user._id)

  let singleArr = [];

  for (let i = 0; i < postsData.length; i++) {
    if (postsData[i].userId === user._id) {
      singleArr.push(postsData[i]);
    }
  }

  const handleDelete = (id, userId) => {
    // console.log(id)

    dispatch(deletePosts(id, userId)).then(() => dispatch(getPosts()));

    if (errorMsg === "You are not authorized!") {
      toast({
        position: "top",
        title: "Sorry you are not authorized",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    if (postsData.length === 0) {
      dispatch(getPosts());
    }
  }, [postsData.length]);

  return (
    <Box
      w="100%"
      h="100%"
      // border="1px solid black"
    >
      <Navbar show={false} handleButton={onOpen}></Navbar>
      <Box
        w="90%"
        h="99%"
        // border="1px solid red"
        p="4"
        m="auto"
      >
        {singleArr.length === 0 ? (
          <Box
            maxW="100%"
            h="600px"
            border="1px solid lightgrey"
            borderRadius="10px"
            margin="auto"
          >
            <Text color="grey" mt="14rem" textAlign="center" fontSize="40px">
              Add something by clicking on Post Error button
            </Text>
          </Box>
        ) : (
          <Grid templateColumns="repeat(3, 1fr)" gap={6} mb="1.6rem" mt="6rem">
            {singleArr.map((post, index) => (
              <GridItem
                boxShadow="2xl"
                key={index}
                maxW="400px"
                h="auto"
                borderRadius="10px"
                mb="auto"
                // border="1px solid grey"
              >
                {/* Image Box */}
                <Box
                  maxW="400px"
                  h="240px"
                  // border="1px solid red"
                >
                  <Image
                    borderTopLeftRadius="10px"
                    borderTopRightRadius="10px"
                    boxSizing="border-box"
                    maxW="398px"
                    h="240px"
                    src={post.quesFile}
                    alt="Error Question Image"
                  ></Image>
                </Box>
                {/* Error Question */}
                <Box
                  maxW="400px"
                  h="auto"
                  // border="1px solid green"
                  p="2"
                >
                  <Text maxW="398px" fontSize="18px">
                    {post.quesError}
                  </Text>
                </Box>
                {/* Error Answer */}
                <Box
                  maxW="400px"
                  h="auto"
                  // border="1px solid red"
                  p="2"
                >
                  <Text maxW="400px" color="grey" fontSize="14px">
                    {post.ansError}
                  </Text>
                </Box>
                <Divider bg="darkgray"></Divider>
                {/* Model to give full screen size answer */}
                <Box
                  maxW="400px"
                  h="auto"
                  // border="1px solid blue"
                >
                  <Flex justifyContent="space-between" p="2">
                    <Box>
                      <DeleteIcon
                        onClick={() => handleDelete(post._id, post.userId)}
                        cursor="pointer"
                        mr="0.6rem"
                        mt="0.2rem"
                        w={7}
                        h={7}
                        color="red.500"
                      />
                      <Edit_Post post={post} />
                    </Box>
                  {/*Full Post View */}
                  <FullPost post={post}/>
                  </Flex>
                </Box>
              </GridItem>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default Posts;
