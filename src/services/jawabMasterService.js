import client from './client';

// Fetch all categories
export const fetchJawabMaster = async (
  page = null,
  limit = null,
  search = '',
  type = ''
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

    if (type) {
      params.type = type;
    }

    const response = await client.get('/jawab-master', { params });

    return response.data;
  } catch (error) {
    console.error('Error fetching jawab-master:', error);
    throw error;
  }
};

// Create a new jawab-master
export const createJawabMaster = async (data) => {
  try {
    const response = await client.post('/jawab-master', data);
    return response.data;
  } catch (error) {
    console.error('Error creating jawab-master:', error);
    throw error;
  }
};

// Edit an existing jawab-master
export const editJawabMaster = async (id, data) => {
  try {
    const response = await client.put(`/jawab-master/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error editing jawab-master:', error);
    throw error;
  }
};

// Delete a jawab-master
export const deleteJawabMaster = async (id) => {
  try {
    const response = await client.delete(`/jawab-master/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting jawab-master:', error);
    throw error;
  }
};
