import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Import Chakra components
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  VStack,
  Textarea,
  Alert,
  AlertIcon,
  AlertTitle,
  Spinner,
  Center,
} from '@chakra-ui/react';

function EditPostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`/api/posts/${id}`);
        setTitle(res.data.title);
        setContent(res.data.content);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch post. You may not have permission.');
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.put(`/api/posts/${id}`, { title, content });
      navigate('/posts');
    } catch (err) {
      setError('Failed to update post.');
    }
  };

  if (loading) {
    return (
      <Center h="50vh">
        <Spinner size="xl" color="#6A5AF9" />
      </Center>
    );
  }

  return (
    <Box
      maxW="lg" // Make it a bit wider for editing
      mx="auto"
      p={8}
      bg="rgba(27, 37, 55, 0.7)"
      backdropFilter="blur(10px)"
      borderWidth={1}
      borderColor="rgba(58, 68, 83, 0.5)"
      borderRadius="xl"
      boxShadow="lg"
    >
      <form onSubmit={handleSubmit}>
        <VStack spacing={6}>
          <Heading as="h2" size="lg" textAlign="center">
            Edit Post
          </Heading>

          {error && (
            <Alert status="error" borderRadius="md" bg="rgba(231, 76, 60, 0.1)" borderColor="#E74C3C">
              <AlertIcon color="#E74C3C" />
              <AlertTitle color="#F8B4B4">{error}</AlertTitle>
            </Alert>
          )}

          <FormControl isRequired>
            <FormLabel color="#A9B4C2">Title:</FormLabel>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              focusBorderColor="#6A5AF9"
              size="lg"
              bg="#121826"
              borderColor="#3A4453"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel color="#A9B4C2">Content:</FormLabel>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              focusBorderColor="#6A5AF9"
              size="lg"
              bg="#121826"
              borderColor="#3A4453"
              height="200px"
            />
          </FormControl>

          <Button
            type="submit"
            bg="#6A5AF9"
            color="white"
            _hover={{ bg: '#5A4AF9' }}
            size="lg"
            width="full"
            isLoading={false}
          >
            Update Post
          </Button>
        </VStack>
      </form>
    </Box>
  );
}

export default EditPostPage;