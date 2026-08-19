import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL || (window.location.hostname === "localhost" ? "http://localhost:8181" : "https://my-tasting.onrender.com");

export const sendContactMessage = async ({ name, email, subject, message }) => {
  try {
    const { data } = await axios.post(`${apiUrl}/contact`, { name, email, subject, message });
    return data;
  } catch (error) {
    return Promise.reject(error.response?.data || error.message);
  }
};

export const getContactMessages = async () => {
  try {
    const { data } = await axios.get(`${apiUrl}/contact`);
    return data;
  } catch (error) {
    return Promise.reject(error.response?.data || error.message);
  }
};

export const deleteContactMessage = async (id) => {
  try {
    const { data } = await axios.delete(`${apiUrl}/contact/${id}`);
    return data;
  } catch (error) {
    return Promise.reject(error.response?.data || error.message);
  }
};
