import React, { useState } from 'react';
import axios from 'axios';

// Import Chakra components
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Textarea,
  Alert,
  AlertIcon,
  AlertTitle,
} from '@chakra-ui/react';

function CreatePostForm({ onPostCreated }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('/api/posts', { title, content });
      onPostCreated(res.data);
      setTitle('');
      setContent('');
    } catch (err) {
      setError('Failed to create post.');
    }
  };

  return (
    <Box
      p={6}
      my={6}
      bg="rgba(18, 24, 38, 0.7)" // Slightly darker than page
      borderWidth={1}
      borderColor="rgba(58, 68, 83, 0.5)"
      borderRadius="xl"
    >
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <Heading as="h4" size="md">Create New Post</Heading>
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
              bg="#121826"
              borderColor="#3A4453"
            />
          </FormControl>

          <Button
            type="submit"
            bg="#6A5AF9"
            color="white"
            _hover={{ bg: '#5A4AF9' }}
            width="full"
          >
            Create Post
          </Button>
        </VStack>
      </form>
    </Box>
  );
}

export default CreatePostForm;