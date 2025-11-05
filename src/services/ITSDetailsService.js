import client from './client';

export const fetchDetailsFromITS = async (id) => {
  try {
    const response = await client.get(`/profile/get-its-profile/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching its category:', error);
    throw error;
  }
};
