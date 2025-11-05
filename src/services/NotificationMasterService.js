import client from './client';

export const fetchNotificationMaster = async (
  page = null,
  limit = null,
  triggerType = null
) => {
  try {
    const params = {};

    if (page !== null && limit !== null) {
      params.page = page;
      params.limit = limit;
    }

    if (triggerType) {
      params.triggerType = triggerType;
    }

    const response = await client.get('/notification-master', { params });

    return response.data;
  } catch (error) {
    console.error('Error fetchUsers:', error);
    throw error;
  }
};

export const createNotificationMaster = async (data) => {
  try {
    const response = await client.post('/notification-master', data);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const editNotificationMaster = async (id, data) => {
  try {
    const response = await client.put(`/notification-master/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error editUser:', error);
    throw error;
  }
};

export const deleteNotificationMaster = async (id) => {
  try {
    const response = await client.delete(`/notification-master/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};
