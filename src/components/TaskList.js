// TaskList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from './Button';
import { getAllTasks, deleteTask } from '../services/taskService';
import TaskForm from './TaskForm';
import './TaskList.css';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showForm, setShowForm] = useState(false); //

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllTasks();
      setTasks(response.data);
    };

    fetchData();
  }, []);

  const handleDelete = async () => {
    if (!selectedTask) {
      alert('Выберите задачу для удаления');
      return;
    }

    await deleteTask(selectedTask.id);
    setTasks(tasks.filter((task) => task.id !== selectedTask.id));
    setSelectedTask(null);
    alert('Задача успешно удалена');
  };

  const handleFormSubmit1 = async (task) => {
    setShowForm(false);
    setSelectedTask(null);
    alert('Задача успешно изменена');
  };

const handleEdit = () => {
  if (!selectedTask) {
    alert('Выберите задачу для редактирования');
    return;
  }
  setShowForm(true);
};


  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Наименование</th>
            <th>Описание</th>
            <th>Статус</th>
            <th>Выбрать</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.name}</td>
              <td>{task.description}</td>
              <td>{task.statusName}</td>
              <td>
                <input
                  type="checkbox"
                  onChange={() => {
                    if (selectedTask && selectedTask.id === task.id) {
                      setSelectedTask(null);
                    } else {
                      setSelectedTask(task);
                    }
                  }}
                  checked={selectedTask && selectedTask.id === task.id}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <Button onClick={handleDelete}>
          Удалить
        </Button>
        <Button onClick={handleEdit} disabled={true}>
          Редактировать
        </Button>
      </div>
      {showForm && (
        <TaskForm
          onSubmit={handleFormSubmit1}
          onCancel={() => {
            setShowForm(false);
            setSelectedTask(null);
          }}
          initialValues={selectedTask}
        />
      )}
    </div>
  );
};

export default TaskList;