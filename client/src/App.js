import React from 'react';
import { Routes, Route, NavLink as RouterNavLink } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Import Chakra components
import { Box, Flex, Heading, Link, Button, Spacer, Container, Text, VStack } from '@chakra-ui/react';

// Page Imports
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';
import PostsPage from './pages/PostsPage';
import EditPostPage from './pages/EditPostPage';

// Route Protection Imports
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

// Custom NavLink component
const NavLink = ({ to, children }) => (
  <Link
    as={RouterNavLink}
    to={to}
    _hover={{ textDecoration: 'none', color: 'white' }}
    _activeLink={{ color: 'white', fontWeight: 'bold' }} // Style for active link
    color="#A9B4C2"
    fontWeight="medium"
  >
    {children}
  </Link>
);

function App() {
  const { user, logout } = useAuth();

  return (
    <Box>
      {/* NEW FROSTED GLASS NAVBAR */}
      <Box
        as="nav"
        bg="rgba(27, 37, 55, 0.7)"
        backdropFilter="blur(10px)"
        borderColor="rgba(58, 68, 83, 0.5)"
        borderBottomWidth={1}
        p={4}
        sticky="top" // Make it stick to the top
        zIndex={10}
      >
        <Flex maxW="1200px" mx="auto" align="center">
          <Heading as="h1" size="md" color="white">
            RBAC Platform
          </Heading>
          
          <Spacer /> 
          
          <Flex gap={8}>
            <NavLink to="/">Home</NavLink>
            {user && <NavLink to="/posts">Posts</NavLink>}
            {user && user.role === 'Admin' && <NavLink to="/admin">Admin</NavLink>}
          </Flex>
          
          <Spacer /> 
          
          <Flex gap={4} align="center">
            {user ? (
              <>
                <NavLink to="/profile">Profile</NavLink>
                <Button
                  onClick={logout}
                  size="sm"
                  bg="#E74C3C"
                  color="white"
                  _hover={{ bg: '#C0392B' }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/register">Register</NavLink>
              </>
            )}
          </Flex>
        </Flex>
      </Box>

      {/* Main Content Area */}
      <Container maxW="1200px" mt={8}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/posts" element={<PostsPage />} />
            <Route path="/post/:id/edit" element={<EditPostPage />} />
          </Route>

          {/* Admin-Only Routes */}
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminPage />} />
          </Route>
        </Routes>
      </Container>
    </Box>
  );
}

// New HomePage component with "Hero" and "Feature Grid"
const HomePage = () => (
  <VStack spacing={12} mb={12}>
    {/* 1. Hero Section */}
    <Box
      p={10}
      bg="rgba(27, 37, 55, 0.7)"
      backdropFilter="blur(10px)"
      borderWidth={1}
      borderColor="rgba(58, 68, 83, 0.5)"
      borderRadius="xl"
      boxShadow="lg"
      textAlign="center"
      w="100%"
    >
      <Heading as="h2" size="2xl" mb={4}>
        Welcome to the RBAC Platform
      </Heading>
      <Text fontSize="xl" color="#A9B4C2" maxW="2xl" mx="auto">
        This is a full-stack MERN application demonstrating Role-Based Access Control.
        Explore secure authentication, content management, and user roles.
      </Text>
    </Box>

    {/* 2. Feature Grid */}
    <Box w="100%">
      <Heading as="h3" size="lg" mb={6} textAlign="center">
        Explore by Role
      </Heading>
      <Flex direction={{ base: 'column', md: 'row' }} gap={6}>
        {/* Viewer Card */}
        <Box
          flex="1"
          p={6}
          bg="rgba(27, 37, 55, 0.7)"
          backdropFilter="blur(10px)"
          borderWidth={1}
          borderColor="rgba(58, 68, 83, 0.5)"
          borderRadius="xl"
          boxShadow="lg"
          transition="all 0.3s ease"
          _hover={{ transform: 'translateY(-5px)', borderColor: '#6A5AF9' }}
        >
          <Heading as="h4" size="md" color="#6A5AF9">Viewer</Heading>
          <Text color="#A9B4C2" mt={2}>
            Log in to view the content feed. You have read-only access to all published posts.
          </Text>
        </Box>
        
        {/* Editor Card */}
        <Box
          flex="1"
          p={6}
          bg="rgba(27, 37, 55, 0.7)"
          backdropFilter="blur(10px)"
          borderWidth={1}
          borderColor="rgba(58, 68, 83, 0.5)"
          borderRadius="xl"
          boxShadow="lg"
          transition="all 0.3s ease"
          _hover={{ transform: 'translateY(-5px)', borderColor: '#6A5AF9' }}
        >
          <Heading as="h4" size="md" color="#6A5AF9">Editor</Heading>
          <Text color="#A9B4C2" mt={2}>
            Create new posts, and edit or delete your own content. Your contributions are vital.
          </Text>
        </Box>
        
        {/* Admin Card */}
        <Box
          flex="1"
          p={6}
          bg="rgba(27, 37, 55, 0.7)"
          backdropFilter="blur(10px)"
          borderWidth={1}
          borderColor="rgba(58, 68, 83, 0.5)"
          borderRadius="xl"
          boxShadow="lg"
          transition="all 0.3s ease"
          _hover={{ transform: 'translateY(-5px)', borderColor: '#6A5AF9' }}
        >
          <Heading as="h4" size="md" color="#6A5AF9">Admin</Heading>
          <Text color="#A9B4C2" mt={2}>
            Full control. Manage all posts, delete any content, and change user roles in the Admin Dashboard.
          </Text>
        </Box>
      </Flex>
    </Box>
  </VStack>
);

export default App;