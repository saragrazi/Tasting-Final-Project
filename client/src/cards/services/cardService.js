import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL || (window.location.hostname === "localhost" ? "http://localhost:8181" : "https://my-tasting.onrender.com");


export const checkAndSaveCard = async (card) => {
  try {
    const { data } = await axios.post(`${apiUrl}/cards/check-and-save`, card);
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};


export const getCards = async () => {
  try {
    const { data } = await axios.get(`${apiUrl}/cards`);
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const getCard = async id => {
  try {
    const { data } = await axios.get(`${apiUrl}/cards/${id}`);
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const getMyCards = async () => {
  try {
    const { data } = await axios.get(`${apiUrl}/cards/my-cards`);
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const getCardsBrowse = async ({ page, limit, search, category } = {}) => {
  try {
    const { data } = await axios.get(`${apiUrl}/cards/browse`, {
      params: { page, limit, search, category },
    });
    return data;
  } catch (error) {
    return Promise.reject(error.response?.data || error.message);
  }
};

export const getMyCardsBrowse = async ({ page, limit, search, category } = {}) => {
  try {
    const { data } = await axios.get(`${apiUrl}/cards/my-cards/browse`, {
      params: { page, limit, search, category },
    });
    return data;
  } catch (error) {
    return Promise.reject(error.response?.data || error.message);
  }
};

export const getMyFavoriteCardsBrowse = async ({ page, limit, search, category } = {}) => {
  try {
    const { data } = await axios.get(`${apiUrl}/cards/my-favorites/browse`, {
      params: { page, limit, search, category },
    });
    return data;
  } catch (error) {
    return Promise.reject(error.response?.data || error.message);
  }
};

const toUploadProgressConfig = (onUploadProgress) =>
  onUploadProgress
    ? {
        onUploadProgress: (event) => {
          const total = event.total || event.loaded || 1;
          onUploadProgress(Math.round((event.loaded * 100) / total));
        },
      }
    : undefined;

export const createCard = async (card, onUploadProgress) => {
  try {
    const { data } = await axios.post(`${apiUrl}/cards`, card, toUploadProgressConfig(onUploadProgress));
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const editCard = async (card, cardId, onUploadProgress) => {
  try {
    const { data } = await axios.put(`${apiUrl}/cards/${cardId}`, card, toUploadProgressConfig(onUploadProgress));
    return data;
  } catch (error) {
    return Promise.reject(error.response?.data || error.message);
  }
};

export const likeCard = async (cardId) => {
  try {
    const { data } = await axios.patch(`${apiUrl}/cards/${cardId}`);
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const addRating = async (cardId, rating) => {
  try {
    const { data } = await axios.post(`${apiUrl}/cards/${cardId}/rate`, { rating });
    return data;
  } catch (error) {
    return Promise.reject(error.response?.data || error.message);
  }
};

export const addComment = async (cardId, { text, parentCommentId }) => {
  try {
    const { data } = await axios.post(`${apiUrl}/cards/${cardId}/comment`, {
      text,
      parentCommentId,
    });
    return data;
  } catch (error) {
    return Promise.reject(error.response?.data || error.message);
  }
};

export const deleteComment = async (cardId, commentId) => {
  try {
    const { data } = await axios.delete(`${apiUrl}/cards/${cardId}/comment/${commentId}`);
    return data;
  } catch (error) {
    return Promise.reject(error.response?.data || error.message);
  }
};

export const reportCard = async (cardId, reason) => {
  try {
    const { data } = await axios.post(`${apiUrl}/cards/${cardId}/report`, { reason });
    return data;
  } catch (error) {
    return Promise.reject(error.response?.data || error.message);
  }
};

export const deleteReport = async (cardId, reportId) => {
  try {
    const { data } = await axios.delete(`${apiUrl}/cards/${cardId}/report/${reportId}`);
    return data;
  } catch (error) {
    return Promise.reject(error.response?.data || error.message);
  }
};

export const deleteCard = async cardId => {
  try {
    const { data } = await axios.delete(`${apiUrl}/cards/${cardId}`);
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};
