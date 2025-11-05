import client from './client';

// Fetch all categories
export const fetchBusinessType = async (
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

    const response = await client.get('/business-types', { params });

    return response.data;
  } catch (error) {
    console.error('Error fetching business-types:', error);
    throw error;
  }
};

// Create a new business-types
export const createBusinessType = async (data) => {
  try {
    const response = await client.post('/business-types', data);
    return response.data;
  } catch (error) {
    console.error('Error creating business-types:', error);
    throw error;
  }
};

// Edit an existing business-types
export const editBusinessType = async (id, data) => {
  try {
    const response = await client.put(`/business-types/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error editing business-types:', error);
    throw error;
  }
};

// Delete a business-types
export const deleteBusinessType = async (id) => {
  try {
    const response = await client.delete(`/business-types/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting business-types:', error);
    throw error;
  }
};
