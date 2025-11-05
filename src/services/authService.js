import client from './client';

export const loginAPI = async (email, password) => {
  try {
    const response = await client.post('/auth/login', {
      email, //admin@araz.com
      password, //Admin@123
    });
    return response.data;
  } catch (error) {
    console.error('Error creating category:', error);
    throw error;
  }
};
