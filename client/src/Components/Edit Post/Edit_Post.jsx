import { EditIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  FormLabel,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import FileBase64 from "react-file-base64";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPosts, updatePosts } from "../../Redux/posts/action";
import quesImg from "../../Images/quesImg.webp"

const Edit_Post = (props) => {
//   console.log(props);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();


  // Update
  const [postDetails, setPostDetails] = useState({});

  const handleChange = (e) => {
    let { name, value } = e.target;
    // console.log(e.target.value)
    setPostDetails({ ...postDetails, [name]: value });
  };

  const handleUpdateBtn = (e) => {
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
        dispatch(updatePosts(payload, props.post._id)).then(() => dispatch(getPosts()));
        // dispatch(createPosts(payload))
        onClose();
        navigate("/posts");
      }
    }
  };
  return (
    <>
      <EditIcon
        // handleUpdate={onOpen}
        onClick={onOpen}
        cursor="pointer"
        mt="0.2rem"
        w={7}
        h={7}
        color="blue.500"
      />
      {/* <Button onClick={onOpen}>Update Error</Button> */}
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Error</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mt={4}>
                {
                  props.post.quesFile === '' ? 
                    (<FormLabel>
                        Error Question Image
                        <Image src={quesImg}></Image>
                    </FormLabel>) :
                    (<FileBase64
                        type="file"
                        name="quesFile"
                        defaultValue={props.post.quesFile}
                        // value={props.post.quesFile}
                        onChange={handleChange}
                        multiple={false}
                        onDone={({ base64 }) =>
                          setPostDetails({
                            ...postDetails,
                            quesFile: base64,
                          })
                        }
                      />)
                }             
            </FormControl>
            {/* </form> */}
            <FormControl mt={4}>
              <FormLabel>Error Question</FormLabel>
              <Textarea
                isRequired
                type="text"
                name="quesError"
                defaultValue={props.post.quesError}
                // value={props.post.quesError}
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
                defaultValue={props.post.ansError}
                // value={props.post.ansError}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Error Answer Image</FormLabel>
              <FileBase64
                type="file"
                name="ansFile"
                defaultValue={props.post.ansFile}
                // value={props.post.ansFile}
                onChange={handleChange}
                multiple={false}
                onDone={({ base64 }) =>
                  setPostDetails({
                    ...postDetails,
                    ansFile: base64,
                  })
                }
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={handleUpdateBtn}
              colorScheme="blue"
              mr={3}
            >
              Update
            </Button>
            <Button onClick={onClose}>Cancel</Button>
            {/* </Flex> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Edit_Post;
