import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, TextField, Button, FormControlLabel, Checkbox } from '@mui/material';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

const TaskEdit = ({ task, onUpdate }) => {
  const history = useHistory();

  // Initialize the form data with default values
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: new Date().toISOString().split('T')[0],
    status: false,
  });

  useEffect(() => {
    // Populate the form data with task details when 'task' prop changes
    if (task) {
      const backendDate = new Date(task.dueDate);
      const formattedDate = `${backendDate.getFullYear()}-${(backendDate.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${backendDate.getDate().toString().padStart(2, '0')}`;

      setFormData({
        title: task.title || '',
        description: task.description || '',
        dueDate: formattedDate,
        status: task.status || false,
      });
    }
  }, [task]);

  const handleChange = (e) => {
    // Update the form data based on user input
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleUpdate = async () => {
    try {
      if (task && task._id) {
        const taskId = task._id;
        history.push('/');
        await onUpdate(taskId, formData);
        
        // Display a success message using SweetAlert2
        Swal.fire({
          icon: 'success',
          title: 'Task Updated',
          text: 'The task has been updated successfully.',
        });
      }
    } catch (error) {
      console.error('Error updating task:', error);

      // Display an error message using SweetAlert2
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
          {/* Form fields for title, description, due date, and completion status */}
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
              min: new Date().toISOString().split('T')[0], // Set minimum date to today
            }}
            required
            sx={{ marginBottom: '1rem' }}
          />
          <FormControlLabel
            control={<Checkbox name="status" checked={formData.status} onChange={handleChange} />}
            label="Completed"
            sx={{ marginLeft: '1rem' }}
          />
          {/* Submit button */}
          <Button type="submit" variant="contained" color="primary">
            Update
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default TaskEdit;
