import axios from 'axios';

export const loginApi = async ({ email, password }) => {
  const res = await axios.post('https://api.escuelajs.co/api/v1/auth/login', {
    email,
    password,
  });
  return res.data; // access_token 
};

export const getUserProfile = async (token) => {
  const res = await axios.get('https://api.escuelajs.co/api/v1/auth/profile', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data; // returns user data
};

export const signupApi = async ({ name, email, password }) => {
  const res = await axios.post('https://api.escuelajs.co/api/v1/users/', {
    name,
    email,
    password,
    avatar: "https://picsum.photos/800"
  });
  return res.data; // returns user data
}
