import client from './client';

export const fetchForms = async (
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

    // Send GET request
    const response = await client.get('/forms', { params });

    return response.data;
  } catch (error) {
    console.error('Error fetching forms:', error);
    throw error;
  }
};

export const getFormById = async (id) => {
  try {
    const response = await client.get(`/forms/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error getting forms:', error);
    throw error;
  }
};

export const createForm = async (data) => {
  try {
    const response = await client.post('/forms', data);
    return response.data;
  } catch (error) {
    console.error('Error creating forms:', error);
    throw error;
  }
};

export const editForm = async (id, data) => {
  try {
    const response = await client.put(`/forms/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error editing form:', error);
    throw error;
  }
};

export const deleteForm = async (id) => {
  try {
    const response = await client.delete(`/forms/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting form:', error);
    throw error;
  }
};

export const getFormByCategories = async (
  category,
  subCategory,
  childCategory
) => {
  try {
    const response = await client.get(
      `/forms/${category}/${subCategory}/${childCategory}`
    );
    return response.data;
  } catch (error) {
    console.error('Error getting forms:', error);
    throw error;
  }
};
