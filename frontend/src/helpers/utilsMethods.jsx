import axios from 'axios';

export const checkUserExists = async (field, value) => {
  try {
    const response = await axios.get(`/users/check-user-exists/${field}/${value}`);
    return response.data.exists;
  } catch (error) {
    console.error('Error checking user existence:', error);
    throw error;
  }
};
