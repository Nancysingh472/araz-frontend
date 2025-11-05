import client from './client';

// Fetch all sub categories
export const fetchSubCategories = async (
  page = null,
  limit = null,
  search = '',
  status = null,
  categoryId = null
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

    if (categoryId !== null) {
      params.categoryId = categoryId;
    }

    const response = await client.get('/sub-category', { params });

    return response.data;
  } catch (error) {
    console.error('Error fetching sub categories:', error);
    throw error;
  }
};

// Create a new sub category
export const createSubCategory = async (subCategoryData) => {
  try {
    const response = await client.post('/sub-category', subCategoryData);
    return response.data;
  } catch (error) {
    console.error('Error creating sub category:', error);
    throw error;
  }
};

// Edit an existing sub category
export const editSubCategory = async (subCategoryId, subCategoryData) => {
  try {
    const response = await client.put(
      `/sub-category/${subCategoryId}`,
      subCategoryData
    );
    return response.data;
  } catch (error) {
    console.error('Error editing sub category:', error);
    throw error;
  }
};

// Delete a sub category
export const deleteSubCategory = async (subCategoryId) => {
  try {
    const response = await client.delete(`/sub-category/${subCategoryId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting sub category:', error);
    throw error;
  }
};
