import client from './client';
import { toast } from 'react-toastify';

export const getSignedUrl = async (fileName, contentType) => {
  try {
    const response = await client.post('/uploads/get-upload-signed-url', {
      fileName: fileName,
      contentType: contentType,
    });
    return response.data;
  } catch (error) {
    console.error('Error getting signed URL:', error);
    throw error;
  }
};

export const uploadFile = async (signedUrl, file) => {
  try {
    const response = await fetch(signedUrl, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': file.type,
      },
    });

    if (response.ok) {
      return response;
    } else {
      toast.error('Something went wrong. Please try again.');
    }
  } catch (error) {
    toast.error('Failed to upload file. Please try again.');
  }
};
