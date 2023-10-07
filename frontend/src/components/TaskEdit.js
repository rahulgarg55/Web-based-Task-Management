import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, TextField, Button, FormControlLabel, Checkbox } from '@mui/material';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios'; // Import Axios

const TaskEdit = ({ task, onUpdate }) => {
  const history = useHistory();

  const initialFormData = {
    title: '',
    description: '',
    dueDate: new Date().toISOString().split('T')[0],
    status: false,
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (task) {
      // Fetch task details from your API when 'task' prop changes
      const fetchTaskDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/tasks/${task._id}`);
          const taskData = response.data;
      
          const backendDate = new Date(taskData.dueDate);
          const day = backendDate.getDate().toString().padStart(2, '0');
          const month = (backendDate.getMonth() + 1).toString().padStart(2, '0');
          const year = backendDate.getFullYear();
      
          const formattedDate = `${year}-${month}-${day}`;
      
          setFormData({
            title: taskData.title || '',
            description: taskData.description || '',
            dueDate: formattedDate,
            status: taskData.status || false,
          });
        } catch (error) {
          console.error('Error fetching task details:', error);
        }
      };
      

      fetchTaskDetails();
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleUpdate = async () => {
    try {
      if (task && task._id) {
        const taskId = task._id;
        history.push('/');
        await onUpdate(taskId, formData);

        Swal.fire({
          icon: 'success',
          title: 'Task Updated',
          text: 'The task has been updated successfully.',
        });
      }
    } catch (error) {
      console.error('Error updating task:', error);

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while updating the task.',
      });
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3}>
        <Typography variant="h5" align="center" gutterBottom>
          Edit Task
        </Typography>
        <form onSubmit={handleUpdate}>
          <TextField
            name="title"
            label="Title"
            fullWidth
            value={formData.title}
            onChange={handleChange}
            required
            sx={{ marginBottom: '1rem' }}
          />
          <TextField
            name="description"
            label="Description"
            fullWidth
            multiline
            value={formData.description}
            onChange={handleChange}
            required
            sx={{ marginBottom: '1rem' }}
          />
          <TextField
            name="dueDate"
            label="Due Date"
            fullWidth
            type="date"
            value={formData.dueDate}
            onChange={handleChange}
            inputProps={{
              min: new Date().toISOString().split('T')[0],
            }}
            required
            sx={{ marginBottom: '1rem' }}
          />
          <FormControlLabel
            control={<Checkbox name="status" checked={formData.status} onChange={handleChange} />}
            label="Completed"
            sx={{ marginLeft: '1rem' }}
          />
          <Button type="submit" variant="contained" color="primary">
            Update
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default TaskEdit;
