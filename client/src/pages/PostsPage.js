import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Link as RouterLink } from 'react-router-dom';
import CreatePostForm from '../components/CreatePostForm';

// Import Chakra components
import {
  Box,
  Heading,
  Button,
  VStack,
  Text,
  Link,
  Flex,
  Spacer,
  Alert,
  AlertIcon,
  AlertTitle,
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
    setPosts([newPost, ...posts]);
    setShowCreateForm(false);
  };

  if (loading) return <div className="page-container"><p>Loading posts...</p></div>;

  return (
    <Box
      p={8}
      bg="rgba(27, 37, 55, 0.7)"
      backdropFilter="blur(10px)"
      borderWidth={1}
      borderColor="rgba(58, 68, 83, 0.5)"
      borderRadius="xl"
      boxShadow="lg"
      minH="70vh" // Give it some height
    >
      <Flex mb={6} align="center">
        <Heading as="h2" size="lg">Content Feed</Heading>
        <Spacer />
        {(user?.role === 'Admin' || user?.role === 'Editor') && (
          <Button
            bg="#6A5AF9"
            color="white"
            _hover={{ bg: '#5A4AF9' }}
            onClick={() => setShowCreateForm(!showCreateForm)}
          >
            {showCreateForm ? 'Cancel' : 'Create New Post'}
          </Button>
        )}
      </Flex>

      {error && (
        <Alert status="error" borderRadius="md" bg="rgba(231, 76, 60, 0.1)" borderColor="#E74C3C" mb={4}>
          <AlertIcon color="#E74C3C" />
          <AlertTitle color="#F8B4B4">{error}</AlertTitle>
        </Alert>
      )}
      
      {showCreateForm && <CreatePostForm onPostCreated={handlePostCreated} />}

      <VStack spacing={6} mt={6}>
        {posts.length === 0 && !loading ? (
          <Text color="#A9B4C2" fontSize="lg">No posts found. Go create one!</Text>
        ) : (
          posts.map((post) => (
            <Box
              key={post._id}
              p={6}
              bg="rgba(27, 37, 55, 0.7)" // Inner card
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
              <Heading as="h3" size="md">{post.title}</Heading>
              <Text fontSize="sm" color="#A9B4C2" mb={4}>
                by {post.author.username}
              </Text>
              <Text color="#F0F4F8" mb={4}>{post.content}</Text>
              
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
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    colorScheme="red"
                    borderColor="#E74C3C"
                    color="#E74C3C"
                    _hover={{ bg: 'rgba(231, 76, 60, 0.1)' }}
                  >
                    Delete
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