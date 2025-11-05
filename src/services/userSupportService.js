import client from './client';

export const createUserSupportQuery = async (data) => {
  try {
    const response = await client.post('/support', data);
    return response.data;
  } catch (error) {
    console.error('Error :: createUserSupportQuery ::', error);
    throw error;
  }
};

export const fetchUserSupportQuery = async (
  page = null,
  limit = null,
  search = '',
  status = null
) => {
  try {
    const params = {};

    // Add pagination parameters only if page and limit are provided
    if (page !== null && limit !== null) {
      params.page = page;
      params.limit = limit;
    }

    // Add search parameter if present
    if (search) {
      params.search = search;
    }

    if (status !== null) {
      params.status = status; // true for Active, false for Inactive
    }

    const response = await client.get(`/support`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetchUserSupportQuery:', error);
    throw error;
  }
};

export const updateUserSupportQuery = async (id, data) => {
  try {
    const response = await client.put(`/support/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error :: updateUserSupportQuery ::', error);
    throw error;
  }
};
