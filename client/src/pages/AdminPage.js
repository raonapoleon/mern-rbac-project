import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Import Chakra components
import {
  Box,
  Heading,
  Alert,
  AlertIcon,
  AlertTitle,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Select,
  Spinner,
  Center,
  Text,
} from '@chakra-ui/react';

function AdminPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await axios.get('/api/users');
        setUsers(res.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch users. Are you an Admin?');
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      const res = await axios.put(`/api/users/${userId}/role`, { role: newRole });
      setUsers(users.map(user => 
        user._id === userId ? { ...user, role: res.data.role } : user
      ));
    } catch (err) {
      setError('Failed to update role.');
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
      p={8}
      bg="rgba(27, 37, 55, 0.7)"
      backdropFilter="blur(10px)"
      borderWidth={1}
      borderColor="rgba(58, 68, 83, 0.5)"
      borderRadius="xl"
      boxShadow="lg"
      minH="70vh"
    >
      <Heading as="h2" size="xl" mb={6} textAlign="center">
        Admin Dashboard: User Management
      </Heading>
      <Text fontSize="md" color="#A9B4C2" mb={6} textAlign="center">
        Manage user roles and permissions across the platform. Changes are applied instantly.
      </Text>
      {error && (
        <Alert status="error" borderRadius="md" bg="rgba(231, 76, 60, 0.1)" borderColor="#E74C3C" mb={4}>
          <AlertIcon color="#E74C3C" />
          <AlertTitle color="#F8B4B4">{error}</AlertTitle>
        </Alert>
      )}
      
      <TableContainer
        bg="rgba(18, 24, 38, 0.7)"
        borderRadius="md"
        borderWidth={1}
        borderColor="rgba(58, 68, 83, 0.5)"
      >
        <Table variant="simple" colorScheme="whiteAlpha">
          <Thead>
            <Tr bg="rgba(58, 68, 83, 0.5)">
              <Th color="white" fontSize="md">Username</Th>
              <Th color="white" fontSize="md">Email</Th>
              <Th color="white" fontSize="md">Role</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user) => (
              <Tr key={user._id} _hover={{ bg: 'rgba(58, 68, 83, 0.3)' }}>
                <Td color="#F0F4F8">{user.username}</Td>
                <Td color="#F0F4F8">{user.email}</Td>
                <Td>
                  <Select 
                    value={user.role} 
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    bg="#121826"
                    borderColor="#3A4453"
                    focusBorderColor="#6A5AF9"
                    color="#F0F4F8"
                  >
                    <option value="Viewer">Viewer</option>
                    <option value="Editor">Editor</option>
                    <option value="Admin">Admin</option>
                  </Select>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default AdminPage;