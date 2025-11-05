import client from './client';

export const createArazRequest = async (data) => {
  try {
    const response = await client.post('/raza-request', data);
    return response.data;
  } catch (error) {
    console.error('Error :: createArazRequest ::', error);
    throw error;
  }
};

export const fetchRequests = async (
  page = null,
  limit = null,
  search = '',
  status = null,
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

    const response = await client.get('/raza-request', { params });

    return response.data;
  } catch (error) {
    console.error('Error fetching raza-request:', error);
    throw error;
  }
};

export const getRequestById = async (id) => {
  try {
    const response = await client.get(`/raza-request/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error :: getRequestById ::', error);
    throw error;
  }
};

export const deleteRequest = async (id) => {
  try {
    const response = await client.delete(`/raza-request/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting Request:', error);
    throw error;
  }
};

// Edit an existing jamaat
export const rejectRequestAPI = async (id, data) => {
  try {
    const response = await client.put(`/raza-request/reject/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error rejectRequestAPI:', error);
    throw error;
  }
};

export const generateDocuments = async (id) => {
  try {
    const response = await client.get(`/raza-request/generate-documents/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error generateDocuments:', error);
    throw error;
  }
};

export const deleteGenerateDocuments = async (id) => {
  try {
    const response = await client.delete(
      `/raza-request/generate-documents/${id}`,
    );
    return response.data;
  } catch (error) {
    console.error('Error deleteGenerateDocuments:', error);
    throw error;
  }
};

export const previewRazaDocument = async (
  id,
  onlyHtml = false,
  withReplace = false,
) => {
  try {
    // Initialize the base URL
    let url = `/raza-request/preview-raza-document/${id}`;

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

export const acceptRequestAPI = async (id, data) => {
  try {
    const response = await client.put(
      `/raza-request/update-status/${id}`,
      data,
    );
    return response.data;
  } catch (error) {
    console.error('Error rejectRequestAPI:', error);
    throw error;
  }
};

export const acceptBulkRequestAPI = async (data) => {
  try {
    const response = await client.put(
      `/raza-request/update-bulk-status`,
      data,
    );
    return response.data;
  } catch (error) {
    console.error('Error rejectRequestAPI:', error);
    throw error;
  }
};

export const bulkPreviewDocApi = async (ids, others = {}) => {
  try {
    const response = await client.put(
      `/raza-request/bulk-preview`,
      {
        requestIds: ids,
        ...others
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error rejectRequestAPI:', error);
    throw error;
  }
};

export const getRazaReport = async () => {
  try {
    const response = await client.get(`/raza-request/report/stats`);
    return response.data;
  } catch (error) {
    console.error('Error :: getRazaReport ::', error);
    throw error;
  }
};

export const getRazaDocumentById = async (id) => {
  try {
    const response = await client.get(`/raza-request/generate-document/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error getRazaDocumentById documents:', error);
    throw error;
  }
};

export const editRazaDocumentById = async (id, data) => {
  try {
    const response = await client.put(
      `/raza-request/generate-document/${id}`,
      data,
    );
    return response.data;
  } catch (error) {
    console.error('Error editing documents:', error);
    throw error;
  }
};
