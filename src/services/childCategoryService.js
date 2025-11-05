import client from './client';

// Fetch all child categories
export const fetchChildCategories = async (
  page = null,
  limit = null,
  search = '',
  status = null,
  subCategoryId = null
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

    if (subCategoryId !== null) {
      params.subCategoryId = subCategoryId;
    }

    const response = await client.get('/child-category', { params });

    return response.data;
  } catch (error) {
    console.error('Error fetching child categories:', error);
    throw error;
  }
};

// Create a new child  category
export const createChildCategory = async (data) => {
  try {
    const response = await client.post('/child-category', data);
    return response.data;
  } catch (error) {
    console.error('Error creating child category:', error);
    throw error;
  }
};

// Edit an existing child  category
export const editChildCategory = async (id, data) => {
  try {
    const response = await client.put(`/child-category/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error editing child category:', error);
    throw error;
  }
};

// Delete a child  category
export const deleteChildCategory = async (id) => {
  try {
    const response = await client.delete(`/child-category/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting child category:', error);
    throw error;
  }
};
