import client from './client';

export const fetchNotification = async (page = null, limit = null) => {
  try {
    const params = {};

    if (page !== null && limit !== null) {
      params.page = page;
      params.limit = limit;
    }

    const response = await client.get('/notification', { params });

    return response.data;
  } catch (error) {
    console.error('Error fetchNotification:', error);
    throw error;
  }
};

export const createNotification = async (data) => {
  try {
    const response = await client.post('/notification', data);
    return response.data;
  } catch (error) {
    console.error('Error createNotification:', error);
    throw error;
  }
};

export const editNotification = async (id, data) => {
  try {
    const response = await client.put(`/notification/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error editNotification:', error);
    throw error;
  }
};

export const deleteNotification = async (id) => {
  try {
    const response = await client.delete(`/notification/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleteNotification:', error);
    throw error;
  }
};
