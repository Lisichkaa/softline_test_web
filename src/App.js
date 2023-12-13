// App.js
import React, { useState } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import Button from './components/Button';
import './styles/main.css';

const App = () => {
  const [showForm, setShowForm] = useState(false);
  const [editTaskData, setEditTaskData] = useState(null);
  
  const handleAdd = () => {
    setShowForm(true);
    setEditTaskData(null);
  };

  const handleFormSubmit = async (task) => {
    setShowForm(false);
    setEditTaskData(null); 
    alert('Задача успешно сохранена');
  };

  return (
    <div>
      <h1>Задачи</h1>
      <TaskList />
      <div>
        <Button onClick={handleAdd}>Добавить</Button>
      </div>
      {showForm && (
        <TaskForm
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditTaskData(null); 
          }}
          initialValues={editTaskData}
        />
      )}
    </div>
  );
};

export default App;