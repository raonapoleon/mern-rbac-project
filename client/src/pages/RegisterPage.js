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

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await register(username, email, password);
      navigate('/login');
    } catch (err) {
      setError('Failed to register. Email might already be in use.');
    }
  };

  return (
    <Flex
      direction={{ base: 'column', md: 'row' }}
      align="center"
      justify="center"
      minH="70vh"
      gap={8}
    >
      {/* 1. Left Side: Welcome Text */}
      <Box flex="1" p={8}>
        <Heading as="h1" size="2xl" mb={4}>
          Create Your Account
        </Heading>
        <Text fontSize="xl" color="#A9B4C2">
          Join the platform to start viewing, creating, and managing content based on your role.
        </Text>
      </Box>

      {/* 2. Right Side: Register Form */}
      <Box
        flex="1"
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
              Sign Up
            </Heading>

            {error && (
              <Alert status="error" borderRadius="md" bg="rgba(231, 76, 60, 0.1)" borderColor="#E74C3C">
                <AlertIcon color="#E74C3C" />
                <AlertTitle color="#F8B4B4">{error}</AlertTitle>
              </Alert>
            )}

            <FormControl isRequired>
              <FormLabel color="#A9B4C2">Username:</FormLabel>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="your_username"
                focusBorderColor="#6A5AF9"
                size="lg"
                bg="#121826"
                borderColor="#3A4453"
              />
            </FormControl>

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
              Register
            </Button>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
}

export default RegisterPage;