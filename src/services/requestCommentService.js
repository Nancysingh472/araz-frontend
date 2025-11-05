import client from './client';

export const createRequestComments = async (data) => {
  try {
    const response = await client.post('/raza-comments', data);
    return response.data;
  } catch (error) {
    console.error('Error :: createRequestComments ::', error);
    throw error;
  }
};

export const fetchRequestComments = async (id) => {
  try {
    const response = await client.get(`/raza-comments/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching raza-comments:', error);
    throw error;
  }
};

export const deleteRequestComment = async (id) => {
  try {
    const response = await client.delete(`/raza-comments/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting comments:', error);
    throw error;
  }
};
