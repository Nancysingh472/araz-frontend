import client from './client';

export const addRazaJawab = async (data) => {
  try {
    const response = await client.put(`/raza-request/add-jawab`, data);
    return response.data;
  } catch (error) {
    console.error('Error addRazaJawab:', error);
    throw error;
  }
};
