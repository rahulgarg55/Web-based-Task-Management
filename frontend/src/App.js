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
    axios.get('http://localhost:3000/tasks')
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error('Error fetching tasks:', error);
      });
  }, []);

  const handleCreateTask = async (newTask) => {
    try {
      // Format the dueDate in the "dd-mm-yyyy" format
      const formattedDueDate = formatDate(newTask.dueDate);
      newTask.dueDate = formattedDueDate;

      const response = await axios.post('http://localhost:3000/tasks', newTask);
      setTasks([...tasks, response.data]);
      history.push('/'); // Redirect to the main page after task creation
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleUpdateTask = async (taskId, updatedTask) => {
    try {
      // Format the dueDate in the "dd-mm-yyyy" format
      const formattedDueDate = formatDate(updatedTask.dueDate);
      updatedTask.dueDate = formattedDueDate;

      const response = await axios.put(`http://localhost:3000/tasks/${taskId}`, updatedTask);

      setTasks((prevTasks) => {
        return prevTasks.map((task) =>
          task._id === response.data._id ? response.data : task
        );
      });

      setEditingTask(null);
      history.push('/');
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:3000/tasks/${taskId}`);
      const updatedTasks = tasks.filter((task) => task._id !== taskId);
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

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
