import client from './client';

// Fetch all Jamaat categories
export const fetchJamaat = async (
  page = null,
  limit = null,
  search = '',
  status = null,
  jamiatId = null
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
    if (jamiatId !== null) {
      params.jamiat = jamiatId;
    }

    // Send GET request
    const response = await client.get('/jamaat', { params });

    return response.data;
  } catch (error) {
    console.error('Error fetching jamaat:', error);
    throw error;
  }
};

// Create a new jamaat
export const createJamaat = async (data) => {
  try {
    const response = await client.post('/jamaat', data);
    return response.data;
  } catch (error) {
    console.error('Error creating jamaat:', error);
    throw error;
  }
};

// Edit an existing jamaat
export const editJamaat = async (id, data) => {
  try {
    const response = await client.put(`/jamaat/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error editing jamaat:', error);
    throw error;
  }
};

// Delete a jamaat
export const deleteJamaat = async (id) => {
  try {
    const response = await client.delete(`/jamaat/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting jamaat:', error);
    throw error;
  }
};
