import client from './client';

export const createSupportComments = async (data) => {
  try {
    const response = await client.post('/support-comments', data);
    return response.data;
  } catch (error) {
    console.error('Error :: createSupportComments ::', error);
    throw error;
  }
};

export const fetchSupportComments = async (id) => {
  try {
    const response = await client.get(`/support-comments/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching fetchSupportComments:', error);
    throw error;
  }
};

export const deleteSupportComment = async (id) => {
  try {
    const response = await client.delete(`/support-comments/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting deleteSupportComment:', error);
    throw error;
  }
};
