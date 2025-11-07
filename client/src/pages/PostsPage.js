import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Link as RouterLink } from 'react-router-dom';
import CreatePostForm from '../components/CreatePostForm';

import {
  Box,
  Heading,
  Button,
  VStack,
  Text,
  Flex,
  Alert,
  AlertIcon,
  AlertTitle,
  Divider,
} from '@chakra-ui/react';

function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await axios.get('/api/posts');
        setPosts(res.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch posts. Are you logged in?');
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const canModify = (postAuthorId) => {
    if (!user) return false;
    if (user.role === 'Admin') return true;
    if (user.role === 'Editor' && user._id === postAuthorId) return true;
    return false;
  };

  const handlePostCreated = (newPost) => {
    const postWithAuthor = {
      ...newPost,
      author: {
        _id: user._id,
        username: user.username
      }
    };
    setPosts([postWithAuthor, ...posts]);
    setShowCreateForm(false);
  };

  const handleDeletePost = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }
    
    try {
      await axios.delete(`/api/posts/${postId}`);
      setPosts(posts.filter(post => post._id !== postId));
    } catch (err) {
      setError('Failed to delete post. You may not have permission.');
    }
  };


  if (loading) return <Box p={8} bg="rgba(27, 37, 55, 0.7)" backdropFilter="blur(10px)" borderWidth={1} borderColor="rgba(58, 68, 83, 0.5)" borderRadius="xl" boxShadow="lg" minH="70vh"><Text>Loading posts...</Text></Box>;

  return (
    <Box
      p={8}
      bg="rgba(27, 37, 55, 0.7)"
      backdropFilter="blur(10px)"
      borderWidth={1}
      borderColor="rgba(58, 68, 83, 0.5)"
      borderRadius="xl"
      boxShadow="lg"
      minH="70vh"
    >
      <Flex mb={6} align="center" justify="space-between">
        <Heading as="h2" size="xl">Content Feed</Heading>
        {(user?.role === 'Admin' || user?.role === 'Editor') && (
          <Button
            bg="#6A5AF9"
            color="white"
            _hover={{ bg: '#5A4AF9' }}
            onClick={() => setShowCreateForm(!showCreateForm)}
          >
            {showCreateForm ? 'Cancel Creation' : 'Create New Post'}
          </Button>
        )}
      </Flex>

      {error && (
        <Alert status="error" borderRadius="md" bg="rgba(231, 76, 60, 0.1)" borderColor="#E74C3C" mb={4}>
          <AlertIcon color="#E74C3C" />
          <AlertTitle color="#F8B4B4">{error}</AlertTitle>
        </Alert>
      )}
      
      {showCreateForm && (
        <Box mb={6}>
          <CreatePostForm onPostCreated={handlePostCreated} />
        </Box>
      )}

      <Divider borderColor="rgba(58, 68, 83, 0.5)" my={6} />

      <VStack spacing={6} mt={6} align="stretch">
        {posts.length === 0 && !loading ? (
          <Text color="#A9B4C2" fontSize="lg" textAlign="center">No posts found. Be the first to create one!</Text>
        ) : (
          posts.map((post) => (
            <Box
              key={post._id}
              p={6}
              bg="rgba(18, 24, 38, 0.7)" // Inner card
              borderWidth={1}
              borderColor="rgba(58, 68, 83, 0.5)"
              borderRadius="lg"
              w="100%"
              transition="all 0.3s ease"
              _hover={{
                transform: 'translateY(-5px)',
                boxShadow: 'xl',
                borderColor: '#6A5AF9',
              }}
            >
              <Heading as="h3" size="md" mb={2}>{post.title}</Heading>
              <Text fontSize="sm" color="#A9B4C2" mb={4}>
                by <Text as="span" fontWeight="bold">{post.author.username}</Text>
              </Text>
              <Text color="#F0F4F8" fontSize="md" mb={4}>{post.content}</Text>
              
              {canModify(post.author._id) && (
                <Flex gap={4}>
                  <Button
                    as={RouterLink} // Use as a link
                    to={`/post/${post._id}/edit`}
                    size="sm"
                    variant="outline"
                    colorScheme="purple"
                    borderColor="#6A5AF9"
                    color="#6A5AF9"
                    _hover={{ bg: 'rgba(106, 90, 249, 0.1)' }}
                  >
                    Edit Post
                  </Button>
                  <Button
                    onClick={() => handleDeletePost(post._id)}
                    size="sm"
                    variant="outline"
                    colorScheme="red"
                    borderColor="#E74C3C"
                    color="#E74C3C"
                    _hover={{ bg: 'rgba(231, 76, 60, 0.1)' }}
                  >
                    Delete Post
                  </Button>
                </Flex>
              )}
            </Box>
          ))
        )}
      </VStack>
    </Box>
  );
}

export default PostsPage;