import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, TextField, Button, FormControlLabel, Checkbox } from '@mui/material';
import { useHistory } from 'react-router-dom';

const TaskEdit = ({ task, onUpdate }) => {
  const history = useHistory();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: new Date().toISOString().split('T')[0],
    status: false,
  });

  useEffect(() => {
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
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleUpdate = async () => {
    try {
      if (task && task._id) {
        const taskId = task._id;
        await onUpdate(taskId, formData);
        history.push('/');
      } else {
        console.error('Task ID is missing.');
      }
    } catch (error) {
      console.error('Error updating task:', error);
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
            Update
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default TaskEdit;
