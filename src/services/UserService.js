import client from './client';

// Fetch all categories
export const fetchUsers = async (
  page = null,
  limit = null,
  roleName = null
) => {
  try {
    const params = {};

    if (page !== null && limit !== null) {
      params.page = page;
      params.limit = limit;
    }
    if (roleName) {
      params.roleName = roleName;
    }

    const response = await client.get('/staff', { params });

    return response.data;
  } catch (error) {
    console.error('Error fetchUsers:', error);
    throw error;
  }
};

export const createUser = async (data) => {
  try {
    const response = await client.post('/staff', data);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const editUser = async (userId, data) => {
  try {
    const response = await client.put(`/staff/${userId}`, data);
    return response.data;
  } catch (error) {
    console.error('Error editUser:', error);
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await client.delete(`/staff/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};
