import {
  Box,
  Container,
  Heading,
  Link,
  useColorModeValue,
  Text,
  Textarea,
  FormLabel,
  FormControl,
  FormHelperText,
  Button,
  useToast,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const Blog = () => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  return (
    <Container maxW={"7xl"} p="12">
      <Heading as="h1" fontSize={["2xl", "3xl"]}>
        Text Sumarize
      </Heading>
      <Box zIndex="1" width="100%" position="absolute" height="100%">
        <Box
          bgGradient={useColorModeValue(
            "radial(orange.600 1px, transparent 1px)",
            "radial(orange.300 1px, transparent 1px)"
          )}
          backgroundSize="20px 20px"
          opacity="0.4"
          height="100%"
        />
      </Box>
      <Box
        marginTop={{ base: "1", sm: "5" }}
        display="flex"
        flexDirection={{ base: "column", sm: "row" }}
        justifyContent="space-between"
      >
        <Box
          display="flex"
          flex="1"
          marginRight="3"
          position="relative"
          alignItems="center"
        >
          <Box
            width={{ base: "100%", sm: "85%" }}
            zIndex="2"
            marginLeft={{ base: "0", sm: "5%" }}
            marginTop="5%"
          >
            <Formik
              onSubmit={async (values) => {
                try {
                  setLoading(true);
                  const { data } = await axios.post("/api", values);
                  toast({
                    position: "bottom",
                    title: "Success",
                    description: "Your post has been summarize",
                    status: "success",
                    isClosable: true,
                  });
                  setText(data.data.summary);
                } catch (error) {
                  console.log(error);
                  toast({
                    position: "bottom",
                    title: "Error",
                    description: "Something went wrong",
                    status: "error",
                    isClosable: true,
                  });
                } finally {
                  setLoading(false);
                }
              }}
              initialValues={{ text: "" }}
              validationSchema={Yup.object().shape({
                text: Yup.string().required("Text required"),
              })}
            >
              {(formik) => (
                <Form onSubmit={formik.handleSubmit}>
                  <FormControl as="fieldset">
                    <FormLabel>Write your text</FormLabel>
                    <Field
                      name="text"
                      as={Textarea}
                      size="lg"
                      placeholder="Here is a sample placeholder"
                    />
                    <ErrorMessage name="text">
                      {(msg) => (
                        <FormHelperText color="red">{msg}</FormHelperText>
                      )}
                    </ErrorMessage>
                  </FormControl>

                  <Button
                    type="submit"
                    mt={4}
                    rightIcon={<ArrowForwardIcon />}
                    colorScheme="teal"
                    isLoading={loading}
                  >
                    Submit
                  </Button>
                </Form>
              )}
            </Formik>
          </Box>
        </Box>
        <Box
          display="flex"
          flex="1"
          flexDirection="column"
          justifyContent="center"
          marginTop={{ base: "3", sm: "0" }}
        >
          <Heading marginTop="1">
            <Link textDecoration="none" _hover={{ textDecoration: "none" }}>
              Summary
            </Link>
          </Heading>
          <Text
            as="p"
            marginTop="2"
            color={useColorModeValue("gray.700", "gray.200")}
            fontSize="lg"
          >
            {text}
          </Text>
        </Box>
      </Box>
    </Container>
  );
};

export default Blog;
