/**
 * TaskList Component
 *
 * This component displays a list of tasks in a table format. Users can view, edit, and delete tasks.
 *
 * @param {Array} tasks - An array of tasks to be displayed.
 * @param {Function} onDelete - A function to handle task deletion.
 *
 * @returns {JSX.Element} The TaskList component.
 */

import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Container, Paper, Typography, Table, TableHead, TableRow, TableCell, TableBody, Button, useMediaQuery } from '@mui/material';
import Swal from 'sweetalert2';

const TaskList = ({ tasks, onDelete }) => {
  const history = useHistory();
  const matches = useMediaQuery('(max-width: 600px)'); 

 const confirmDelete = (taskId) => {
  Swal.fire({
    title: 'Are you sure?',
    text: 'You will not be able to recover this task!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel',
  }).then((result) => {
    if (result.isConfirmed) {
      onDelete(taskId);
    }
  });
};

const confirmEdit = (taskId) => {
  Swal.fire({
    title: 'Are you sure?',
    text: 'You are about to edit this task.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, edit it!',
    cancelButtonText: 'Cancel',
  }).then((result) => {
    if (result.isConfirmed) {
      // User clicked "Yes, edit it!"
      onEdit(taskId); // Call the onEdit function to navigate to the edit page
    }
  });
};


  const onEdit = (task) => {
    history.push(`/edit/${task._id}`);
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3}>
        <Typography variant="h5" align="center" gutterBottom>
          Tasks List
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <Typography variant="h6">Task List</Typography>
          <Button
            component={Link}
            to="/create"
            variant="contained"
            color="primary"
            sx={{ p: matches ? '0.5rem' : '1rem' }} 
          >
            Create New Task
          </Button>
        </div>
        <div style={{ overflowX: 'auto' }}> {/* Add scroll for table */}
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task._id}>
                  <TableCell>{task.title}</TableCell>
                  <TableCell>{task.description}</TableCell>
                  <TableCell>{task.dueDate}</TableCell>
                  <TableCell>{task.status ? 'Completed' : 'Not Completed'}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" onClick={() => confirmEdit(task)}>
                      Edit
                    </Button>
                    <Button variant="contained" color="secondary" onClick={() => confirmDelete(task._id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Paper>
    </Container>
  );
};

export default TaskList;
