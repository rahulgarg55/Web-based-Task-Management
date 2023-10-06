import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, TextField, Button, FormControlLabel, Checkbox } from '@mui/material';
import { useHistory } from 'react-router-dom';

const TaskForm = ({ onSubmit, task }) => {
  const history = useHistory();

  // Initialize formData based on whether a task is provided
  const [formData, setFormData] = useState(() => {
    const initialDueDate = task ? new Date(task.dueDate).toISOString().split('T')[0] : '';
    return {
      title: task ? task.title : '',
      description: task ? task.description : '',
      dueDate: initialDueDate,
      status: task ? task.status : false,
    };
  });

  // Update formData if the task prop changes
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

    // Convert the dueDate to the "dd-mm-yyyy" format expected by your backend
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
          Create Task
        </Typography>
        <form onSubmit={handleSubmit}>
          {/* Your form fields */}
          <TextField
            name="title"
            label="Title"
            fullWidth
            value={formData.title}
            onChange={handleChange}
            required
          />
          <TextField
            name="description"
            label="Description"
            fullWidth
            multiline
            value={formData.description}
            onChange={handleChange}
            required
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
          />
          <FormControlLabel
            control={<Checkbox name="status" checked={formData.status} onChange={handleChange} />}
            label="Completed"
          />
          <Button type="submit" variant="contained" color="primary">
            Create
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default TaskForm;