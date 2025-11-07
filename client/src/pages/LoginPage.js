import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  VStack,
  Alert,
  AlertIcon,
  AlertTitle,
  Flex, // Import Flex
  Text,  // Import Text
} from '@chakra-ui/react';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate('/profile');
    } catch (err) {
      setError('Failed to log in. Check email or password.');
    }
  };

  return (
    // Main container for the split layout
    <Flex
      direction={{ base: 'column', md: 'row' }} // Stack on mobile, side-by-side on desktop
      align="center"
      justify="center"
      minH="70vh" // Give it height
      gap={8} // Space between items
    >
      {/* 1. Left Side: Welcome Text */}
      <Box flex="1" p={8}>
        <Heading as="h1" size="2xl" mb={4}>
          Welcome Back
        </Heading>
        <Text fontSize="xl" color="#A9B4C2">
          Log in to access your secure dashboard, manage content, and view your profile.
        </Text>
      </Box>

      {/* 2. Right Side: Login Form */}
      <Box
        flex="1" // Both boxes take equal space
        maxW="md"
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
              Member Login
            </Heading>

            {error && (
              <Alert status="error" borderRadius="md" bg="rgba(231, 76, 60, 0.1)" borderColor="#E74C3C">
                <AlertIcon color="#E74C3C" />
                <AlertTitle color="#F8B4B4">{error}</AlertTitle>
              </Alert>
            )}

            <FormControl isRequired>
              <FormLabel color="#A9B4C2">Email:</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                focusBorderColor="#6A5AF9"
                size="lg"
                bg="#121826"
                borderColor="#3A4453"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel color="#A9B4C2">Password:</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                focusBorderColor="#6A5AF9"
                size="lg"
                bg="#121826"
                borderColor="#3A4453"
              />
            </FormControl>

            <Button
              type="submit"
              bg="#6A5AF9"
              color="white"
              _hover={{ bg: '#5A4AF9', transform: 'translateY(-2px)', boxShadow: 'lg' }}
              size="lg"
              width="full"
              isLoading={false}
              transition="all 0.3s ease"
            >
              Login
            </Button>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
}

export default LoginPage;