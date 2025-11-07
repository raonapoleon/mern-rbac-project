import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

// Import Chakra components
import {
  Box,
  Heading,
  Text,
  VStack,
  Avatar, // We'll add an avatar
  Divider, // A line separator
  Button,
  Flex,
  Tag, // To make the role stand out
} from '@chakra-ui/react';

function ProfilePage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Function to get a color scheme for the role tag
  const getRoleColor = (role) => {
    if (role === 'Admin') return 'red';
    if (role === 'Editor') return 'purple';
    return 'gray';
  };

  return (
    <Box
      maxW="lg" // Make the card wider
      mx="auto"
      p={8}
      bg="rgba(27, 37, 55, 0.7)"
      backdropFilter="blur(10px)"
      borderWidth={1}
      borderColor="rgba(58, 68, 83, 0.5)"
      borderRadius="xl"
      boxShadow="lg"
    >
      <VStack spacing={6}>
        {/* 1. Avatar and Welcome Header */}
        <Avatar
          size="xl"
          name={user.username}
          bg="#6A5AF9" // Use our primary color for the avatar background
          color="white"
        />
        <Heading as="h2" size="xl">
          Welcome, {user.username}!
        </Heading>
        <Text fontSize="lg" color="#A9B4C2" mt={-2}>
          This is your personal profile dashboard.
        </Text>

        <Divider borderColor="rgba(58, 68, 83, 0.5)" />

        {/* 2. User Details Section */}
        <VStack spacing={4} align="stretch" w="100%">
          <Heading as="h3" size="md" color="#A9B4C2">
            Your Details
          </Heading>
          
          <Flex justify="space-between" align="center">
            <Text fontSize="lg" color="#A9B4C2">Username:</Text>
            <Text fontSize="lg" fontWeight="bold">{user.username}</Text>
          </Flex>
          
          <Flex justify="space-between" align="center">
            <Text fontSize="lg" color="#A9B4C2">Email:</Text>
            <Text fontSize="lg" fontWeight="bold">{user.email}</Text>
          </Flex>
          
          <Flex justify="space-between" align="center">
            <Text fontSize="lg" color="#A9B4C2">Role:</Text>
            <Tag
              size="lg"
              colorScheme={getRoleColor(user.role)}
              borderRadius="full"
            >
              {user.role}
            </Tag>
          </Flex>
        </VStack>

        <Divider borderColor="rgba(58, 68, 83, 0.5)" />

        {/* 3. Call to Action Button */}
        {(user.role === 'Editor' || user.role === 'Admin') && (
          <Button
            bg="#6A5AF9"
            color="white"
            _hover={{ bg: '#5A4AF9', transform: 'translateY(-2px)', boxShadow: 'lg' }}
            size="lg"
            width="full"
            transition="all 0.3s ease"
            onClick={() => navigate('/posts')} // Navigate to posts page
          >
            Manage Content
          </Button>
        )}
      </VStack>
    </Box>
  );
}

export default ProfilePage;