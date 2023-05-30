import axios from 'axios';

const baseUrl = 'http://localhost:8080/api/comments';

export const getComments = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

export const deleteComment = async (commentId) => {
  await axios.delete(`${baseUrl}/${commentId}`);
};

export const addComment = async (id, userId, comment) => {
  const response = await axios.post(`${baseUrl}/${id}/${userId}`, { comment });
  return response.data;
};

export const editComment = async (commentId, editedComment) => {
  await axios.put(`${baseUrl}/${commentId}`, { comment: editedComment });
};
