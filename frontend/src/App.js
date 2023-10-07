import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';
import { Container } from '@mui/material';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskEdit from './components/TaskEdit';

import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const history = useHistory();

  useEffect(() => {
    // Fetch tasks from the server when the component mounts
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  // Function to create a new task
  const handleCreateTask = async (newTask) => {
    try {
      const formattedDueDate = formatDate(newTask.dueDate);
      newTask.dueDate = formattedDueDate;

      const response = await axios.post('http://localhost:3000/tasks', newTask);
      setTasks([...tasks, response.data]);
      history.push('/');
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  // Function to update an existing task
  // Function to update an existing task
const handleUpdateTask = async (taskId, updatedTask) => {
  try {
    updatedTask.dueDate = formatDate(updatedTask.dueDate); // Format the dueDate

    const response = await axios.put(`http://localhost:3000/tasks/${taskId}`, updatedTask);

    // Update the local state with the updated task
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task._id === response.data._id ? response.data : task))
    );

    setEditingTask(null);
    history.push('/');
  } catch (error) {
    console.error('Error updating task:', error);
  }
};


  // Function to delete a task
  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:3000/tasks/${taskId}`);
      
      // Remove the deleted task from the local state
      const updatedTasks = tasks.filter((task) => task._id !== taskId);
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // Function to format a date string to "dd-mm-yyyy" format
  const formatDate = (dateString) => {
    try {
      const [day, month, year] = dateString.split('-');
      return `${day}-${month}-${year}`;
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString;
    }
  };

  return (
    <Router>
      <Container>
        <Switch>
          <Route path="/create">
            <TaskForm onSubmit={handleCreateTask} />
          </Route>
          <Route
            path="/edit/:taskId"
            render={(props) => {
              const taskId = props.match.params.taskId;
              const taskToEdit = tasks.find((task) => task._id === taskId);
              return (
                <TaskEdit task={taskToEdit} onUpdate={handleUpdateTask} />
              );
            }}
          />
          <Route path="/">
            <TaskList tasks={tasks} onDelete={handleDeleteTask} />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
