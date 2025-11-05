import client from './client';

// Fetch all categories
export const fetchJamiat = async (
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

    const response = await client.get('/jamiat', { params });

    return response.data;
  } catch (error) {
    console.error('Error fetching jamiat:', error);
    throw error;
  }
};

// Create a new jamiat
export const createJamiat = async (data) => {
  try {
    const response = await client.post('/jamiat', data);
    return response.data;
  } catch (error) {
    console.error('Error creating jamiat:', error);
    throw error;
  }
};

// Edit an existing jamiat
export const editJamiat = async (id, data) => {
  try {
    const response = await client.put(`/jamiat/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error editing jamiat:', error);
    throw error;
  }
};

// Delete a jamiat
export const deleteJamiat = async (id) => {
  try {
    const response = await client.delete(`/jamiat/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting jamiat:', error);
    throw error;
  }
};
