import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserService = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetchUsers();
  }, []);
  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  const addUser = async (user) => {
    try {
      const response = await axios.post('/api/user/add', user);
      fetchUsers(); // Refresh the user list
      return response.data;
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };
  const getUserByEmail = async (email) => {
    try {
      const response = await axios.get(`/api/user/${email}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };
  const deleteUser = async (email) => {
    try {
      await axios.delete(`/api/user/${email}`);
      fetchUsers(); // Refresh the user list
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  const updateUser = async (user) => {
    try {
      const response = await axios.put('/api/user/update', user);
      fetchUsers(); // Refresh the user list
      return response.data;
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };
  return {
    users,
    addUser,
    getUserByEmail,
    deleteUser,
    updateUser,
  };
};
export default UserService;
