import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8181';

export const login = async user => {
    try {
        const { data } = await axios.post(`${apiUrl}/users/login`, user);
        return data;
    } catch (error) {
        return Promise.reject(error.message);
    }
};

export const signUp = async user => {
    try {
        const { data } = await axios.post(`${apiUrl}/users`, user);
        return data;
    } catch (error) {
        return Promise.reject(error.message);
    }
};

export const editUser = async(id, card) => {
    try {
        const { data } = await axios.put(`${apiUrl}/users/${id}`, card);
        return data;
    } catch (error) {
        return Promise.reject(error.response.data);
    }
};
export const editBusinessStatus = async(id, status) => {
    try {
        const { data } = await axios.patch(`${apiUrl}/users/${id}`, status);
        return data;
    } catch (error) {
        return Promise.reject(error.response.data);
    }
};

export const getUser = async userId => {
    try {
        const { data } = await axios.get(`${apiUrl}/users/${userId}`);
        return data;
    } catch (error) {
        return Promise.reject(error.message);
    }
};

export const getUsers = async userId => {
    try {
        const { data } = await axios.get(`${apiUrl}/users/`);
        return data;
    } catch (error) {
        return Promise.reject(error.message);
    }
};

export const deleteUser = async userId => {
    try {
        const { data } = await axios.delete(`${apiUrl}/users/${userId}`);
        return data;
    } catch (error) {
        return Promise.reject(error.message);
    }
};