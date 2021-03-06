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
  Stack,
  useToast,
  StatGroup,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Tag,
  Skeleton,
} from '@chakra-ui/react';

import { ArrowForwardIcon } from '@chakra-ui/icons';
import { useState } from 'react';

import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

import axios from 'axios';

const wordCount = (str: string): number => {
  if (str.length === 0) return 0;
  return str.split(' ').length;
};

const Blog = () => {
  const [text, setText] = useState('');
  const [fullText, setFullText] = useState('');
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const color = useColorModeValue('gray.50', 'gray.800');

  return (
    <Container maxW={'full'} p="12">
      <Heading as="h1" fontSize={['2xl', '3xl']}>
        Text Summarize
      </Heading>
      <Box zIndex="-1" width="100%" position="absolute" height="100%">
        <Box
          bgGradient={useColorModeValue(
            'radial(orange.600 1px, transparent 1px)',
            'radial(orange.300 1px, transparent 1px)'
          )}
          backgroundSize="20px 20px"
          opacity="0.4"
          height="100%"
        />
      </Box>
      <Box
        marginTop={{ base: '1', sm: '5' }}
        display="flex"
        flexDirection={{ base: 'column' }}
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
            width={{ base: '100%', sm: '85%' }}
            zIndex="2"
            marginLeft={{ base: '0', sm: '5%' }}
            marginTop="5%"
          >
            <Formik
              onSubmit={async (values) => {
                try {
                  setLoading(true);
                  const { data } = await axios.post('/api', values);
                  toast({
                    position: 'bottom',
                    title: 'Success',
                    description: 'Your post has been summarize',
                    status: 'success',
                    isClosable: true,
                  });
                  setText(data.data.summary);
                  setFullText(data.data.fullText);
                } catch (error) {
                  console.error(error);
                  toast({
                    position: 'bottom',
                    title: 'Error',
                    description: 'Something went wrong',
                    status: 'error',
                    isClosable: true,
                  });
                } finally {
                  setLoading(false);
                }
              }}
              initialValues={{ text: '' }}
              validationSchema={Yup.object().shape({
                text: Yup.string()
                  .required('Text is required')
                  .min(100, 'Your text must be at least 100 characters'),
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
                      placeholder="Write your text here..."
                    />
                    <Tag mt={4} colorScheme="cyan">
                      {wordCount(formik.values.text)} Words
                    </Tag>
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
          marginTop={{ base: '3', sm: '0' }}
        >
          <Heading marginTop="1">
            <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
              Summary
            </Link>
          </Heading>
          {loading ? (
            <Stack>
              <Skeleton height="20px" />
              <Skeleton height="20px" />
              <Skeleton height="20px" />
              <Skeleton height="20px" />
              <Skeleton height="20px" />
              <Skeleton height="20px" />
            </Stack>
          ) : (
            <Stack
              bg={color}
              py={16}
              px={8}
              spacing={{ base: 8, md: 10 }}
              align={'center'}
              direction={'column'}
            >
              {text && (
                <StatGroup>
                  <Stat>
                    <StatLabel>Reduced to</StatLabel>
                    <StatNumber>{wordCount(text)} Words</StatNumber>
                    <StatHelpText>
                      <StatArrow type="increase" />
                      {(
                        100 -
                        (wordCount(text) / wordCount(fullText)) * 100
                      ).toFixed(2)}
                      %
                    </StatHelpText>
                  </Stat>
                </StatGroup>
              )}
              <Text
                fontSize={{ base: 'xl', md: '2xl' }}
                textAlign={'center'}
                maxW={'3xl'}
              >
                {text}
              </Text>
            </Stack>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default Blog;
