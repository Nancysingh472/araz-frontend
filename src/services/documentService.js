import client from './client';

export const fetchDocuments = async (
  page = null,
  limit = null,
  search = '',
  status = null,
  type = 'form',
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

    params.type = type;

    // Send GET request
    const response = await client.get('/documents', { params });

    return response.data;
  } catch (error) {
    console.error('Error fetching documents:', error);
    throw error;
  }
};

export const getDocumentById = async (id) => {
  try {
    const response = await client.get(`/documents/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error getting documents:', error);
    throw error;
  }
};

export const createDocument = async (data) => {
  try {
    const response = await client.post('/documents', data);
    return response.data;
  } catch (error) {
    console.error('Error creating documents:', error);
    throw error;
  }
};

export const editDocument = async (id, data, isBulk = false) => {
  try {
    let url = `/documents/${id}`;
    if (isBulk) {
      url = `/documents/bulk/${id}`;
    }
    const response = await client.put(url, data);
    return response.data;
  } catch (error) {
    console.error('Error editing documents:', error);
    throw error;
  }
};

export const deleteDocument = async (id) => {
  try {
    const response = await client.delete(`/documents/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting documents:', error);
    throw error;
  }
};

export const getDocumentPreview = async (
  id,
  onlyHtml = false,
  withReplace = false,
) => {
  try {
    // Initialize the base URL
    let url = `/documents/preview/${id}`;

    // Add query parameters conditionally
    const params = new URLSearchParams();

    if (onlyHtml) {
      params.append('onlyHtml', 'true');
    }

    if (withReplace) {
      params.append('withReplace', 'true');
    }

    // If there are any query parameters, append them to the URL
    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    const response = await client.get(url);
    return response.data;
  } catch (error) {
    console.error('Error getting documents preview:', error);
    throw error;
  }
};

export const getDocumentByCategories = async (
  category,
  subCategory,
  childCategory,
  type,
) => {
  try {
    const response = await client.get(
      `/documents/${category}/${subCategory}/${childCategory}/${type}`,
    );
    return response.data;
  } catch (error) {
    console.error('Error getting documents:', error);
    throw error;
  }
};
