import axios from 'axios';

const API_URL = 'http://localhost:5000/api/chat';

export const getresponse = async (message) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(API_URL, { message }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data.response;
  } catch (error) {
    console.error('Error fetching chat response:', error);
    throw error;
  }
};