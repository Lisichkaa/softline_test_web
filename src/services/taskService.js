// taskService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const getAllTasks = () => axios.get(`${API_URL}/Tasks`);
const deleteTask = (id) => axios.delete(`${API_URL}/Tasks/${id}`);

const getAllStatuses = () => axios.get(`${API_URL}/Status`);

const createTask = async (taskData) => {
    try {
      const response = await axios.post(`${API_URL}/Tasks`, taskData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const updateTask = async (taskId, taskData) => {
    try {
      const response = await axios.put(`${API_URL}/Tasks/${taskId}`, taskData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  

export { getAllTasks, deleteTask, getAllStatuses, createTask, updateTask};
