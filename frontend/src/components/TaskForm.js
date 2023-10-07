import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, TextField, Button, FormControlLabel, Checkbox } from '@mui/material';
import { useHistory } from 'react-router-dom';

const TaskForm = ({ onSubmit, task }) => {
  const history = useHistory();

  // Initialize formData based on whether a task is provided
  const [formData, setFormData] = useState(() => {
    const today = new Date().toISOString().split('T')[0]; // Get today's date in "yyyy-mm-dd" format
    return {
      title: task ? task.title : '',
      description: task ? task.description : '',
      dueDate: task ? task.dueDate : today, // Use today's date if no task is provided
      status: task ? task.status : false,
    };
  });

  useEffect(() => {
    if (task) {
      const initialDueDate = new Date(task.dueDate).toISOString().split('T')[0];
      setFormData({
        title: task.title,
        description: task.description,
        dueDate: initialDueDate,
        status: task.status,
      });
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert the dueDate to the "dd-mm-yyyy" format expected by our backend
    const formattedDueDate = `${formData.dueDate.slice(8, 10)}-${formData.dueDate.slice(5, 7)}-${formData.dueDate.slice(0, 4)}`;

    const formattedData = {
      ...formData,
      dueDate: formattedDueDate,
    };

    try {
      await onSubmit(formattedData); // Ensure that onSubmit is a function
      history.push('/');
    } catch (error) {
      console.error('Error creating/updating task:', error);
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3}>
        <Typography variant="h5" align="center" gutterBottom>
          {task ? 'Edit Task' : 'Create Task'}
        </Typography>
        <form onSubmit={handleSubmit}>
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
            InputLabelProps={{
              shrink: true, // This ensures that the label remains visible when a date is selected
            }}
            placeholder="" 
            required
            sx={{ marginBottom: '1rem' }}
          />

          <FormControlLabel
            control={<Checkbox name="status" checked={formData.status} onChange={handleChange} />}
            label="Completed"
            sx={{ marginLeft: '1rem' }}
          />
          <Button type="submit" variant="contained" color="primary">
            {task ? 'Update' : 'Create'}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default TaskForm;
