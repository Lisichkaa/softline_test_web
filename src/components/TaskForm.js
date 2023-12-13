// // TaskForm.js
import React, { useState, useEffect } from 'react';
import Button from './Button';
import { getAllStatuses, createTask, updateTask } from '../services/taskService';
import './TaskForm.css'; 


const TaskForm = ({ onSubmit, onCancel, initialValues}) => {
  const [name, setName] = useState(initialValues ? initialValues.name : ''); 
  const [description, setDescription] = useState( initialValues ? initialValues.description : ''
  );
  const [status, setStatus] = useState(
    initialValues ? initialValues.status.status_ID : null
  );
  const [statuses, setStatuses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const response = await getAllStatuses();
        setStatuses(response.data);
      } catch (error) {
        console.error('Error fetching statuses:', error);
        setError('Ошибка при загрузке статусов');
      }
    };

    fetchStatuses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    if (!name || !description || !status) {
      setError('Заполните все поля');
      return;
    }
    try {
      const response = await createTask({
        name,
        description,
        status_ID: status,
      });
      
      const createdTask = response.data;
      onSubmit(createTask);
    } 
    catch (error) {
      console.error('Error creating task:', error);
      setError('Ошибка при создании задачи');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <label>
        Наименование:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Описание:
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <label>
        Статус:
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">Выберите статус</option>
          {statuses.map((status) => (
            <option key={status.status_ID} value={status.status_ID}>
              {status.status_name}
            </option>
          ))}
        </select>
      </label>
      <div>
        <Button type="submit">Сохранить</Button>
        <Button onClick={onCancel}>Отмена</Button>
      </div>
    </form>
  );
};

export default TaskForm;
