import React from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  Image,
  Text,
} from "@chakra-ui/react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import Navbar from "../../Components/Navbar/Navbar.jsx";
import { useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteAdminPosts, getPosts, getPostsHome } from "../../Redux/posts/action";
import { DeleteIcon } from '@chakra-ui/icons'
import FullPost from "../../Components/Full Post/FullPost.jsx";

const Home = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const  postsData  = useSelector((store) => store.PostsReducer.postsData);
  // console.log(postsData);
  const dispatch = useDispatch();
  const handleBtn = () => {
    toast({
      position: "top",
      title: "Please Signup or Login",
      status: "warning",
      duration: 4000,
      isClosable: true,
    });
  };

  const handleDelete = (id, userId) => {
    console.log(id)
    dispatch(deleteAdminPosts(id)).then( () => dispatch(getPostsHome()))
  }

  useEffect(() => {
    if (postsData.length === 0) {
      dispatch(getPostsHome());
    }
  }, [postsData.length]);

  return (
    <Box w="100%" h="100vh">
      <Navbar handleButton={handleBtn}></Navbar>
      {/* <Posts/> */}
      <Box
        maxW="90%"
        h="auto"
        // border="1px solid red"
        p="4"
        mt='2rem'
        m="auto"
       
      >
        <Grid templateColumns="repeat(3, 1fr)" gap={6} mb="1.6rem" mt='6rem'>
          {postsData.map((post, index) => {
            return (
              <GridItem
                boxShadow="2xl"
                key={index}
                maxW="400px"
                h="auto"
                borderRadius="10px"
                mb='auto'
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
                    <Text></Text>
                    {/* <DeleteIcon onClick={() => handleDelete(post._id)} cursor='pointer'  mt='0.2rem' w={7} h={7} color="red.500" /> */}
                  {/*Full Post View */}
                  <FullPost post={post}/>
                  </Flex>
                </Box>
              </GridItem>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
};

export default Home;
