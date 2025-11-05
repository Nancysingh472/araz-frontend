import client from './client';

// Fetch all categories
export const fetchCategories = async (
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

    const response = await client.get('/category', { params });

    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

// Create a new category
export const createCategory = async (categoryData) => {
  try {
    const response = await client.post('/category', categoryData);
    return response.data;
  } catch (error) {
    console.error('Error creating category:', error);
    throw error;
  }
};

// Edit an existing category
export const editCategory = async (categoryId, categoryData) => {
  try {
    const response = await client.put(`/category/${categoryId}`, categoryData);
    return response.data;
  } catch (error) {
    console.error('Error editing category:', error);
    throw error;
  }
};

// Delete a category
export const deleteCategory = async (categoryId) => {
  try {
    const response = await client.delete(`/category/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error;
  }
};
