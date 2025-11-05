import client from './client';

export const createFormQuestions = async (data) => {
  try {
    const response = await client.post('/form-questions', data);
    return response.data;
  } catch (error) {
    console.error('Error creating question:', error);
    throw error;
  }
};

export const editFormQuestions = async (id, data) => {
  try {
    const response = await client.put(`/form-questions/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error editing question:', error);
    throw error;
  }
};

export const deleteQuestion = async (id) => {
  try {
    const response = await client.delete(`/form-questions/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting question:', error);
    throw error;
  }
};
