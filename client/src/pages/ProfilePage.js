import React from 'react';
import { useAuth } from '../context/AuthContext';

// Import Chakra components
import { Box, Heading, Text, VStack } from '@chakra-ui/react';

function ProfilePage() {
  const { user } = useAuth();

  return (
    <Box
      maxW="md"
      mx="auto"
      p={8}
      bg="rgba(27, 37, 55, 0.7)"
      backdropFilter="blur(10px)"
      borderWidth={1}
      borderColor="rgba(58, 68, 83, 0.5)"
      borderRadius="xl"
      boxShadow="lg"
    >
      <VStack spacing={4} align="flex-start">
        <Heading as="h2" size="lg">
          Profile
        </Heading>
        <Text fontSize="xl">
          <Text as="span" color="#A9B4C2" fontWeight="medium">Username:</Text> {user.username}
        </Text>
        <Text fontSize="xl">
          <Text as="span" color="#A9B4C2" fontWeight="medium">Email:</Text> {user.email}
        </Text>
        <Text fontSize="xl">
          <Text as="span" color="#A9B4C2" fontWeight="medium">Role:</Text> {user.role}
        </Text>
      </VStack>
    </Box>
  );
}

export default ProfilePage;