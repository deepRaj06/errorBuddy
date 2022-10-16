import {
  Box,
  Button,
  Divider,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";

const FullPost = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>Read More</Button>
      <Modal size="full" onClose={onClose} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Full View</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box
              // border="1px solid red"
              m="auto"
              w="80%"
            >
              <Box w="100%" h="auto" m="auto">
                <Image
                  borderTopLeftRadius="10px"
                  borderTopRightRadius="10px"
                  // borderRadius='10px'
                  boxSizing="border-box"
                  w="100%"
                  h="auto"
                  src={props.post.quesFile}
                  alt="Error Question Image"
                ></Image>
              </Box>

              <Box
                w="100%"
                m="auto"
                h="auto"
                p="2"
                border="1px solid grey"
                mt="0.4rem"
                mb="0.4rem"
              >
                {/* Error Question */}
                <Box w="100%" m="auto" h="auto">
                  <Text fontSize="18px">{props.post.quesError}</Text>
                </Box>
                <Divider w="100%" bg="blackAlpha.900"></Divider>
                {/* Error Answer */}
                <Box w="100%" m="auto" h="auto">
                  <Text color="grey" fontSize="14px">
                    {props.post.ansError}
                  </Text>
                </Box>
                <Divider w="100%" bg="blackAlpha.900"></Divider>
              </Box>
              {/* Answer Image Box */}
              <Box
                w="100%"
                h="auto"
                // border="1px solid red"
              >
                <Image
                  borderBottomLeftRadius="10px"
                  borderBottomRightRadius="10px"
                  // borderRadius="10px"
                  boxSizing="border-box"
                  w="100%"
                  h="auto"
                  src={props.post.ansFile}
                  alt="Error Answer Image"
                ></Image>
              </Box>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default FullPost;
