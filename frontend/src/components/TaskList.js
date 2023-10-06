import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  useMediaQuery,
} from '@mui/material';
import Swal from 'sweetalert2';

const TaskList = ({ tasks, onDelete }) => {
  const history = useHistory();
  const matches = useMediaQuery('(max-width: 800px)');

  // Function to confirm task deletion
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

  // Function to confirm task edit and navigate to the edit page
  const confirmEdit = (task) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to edit this task.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, edit it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        onEdit(task._id); // Call the onEdit function to navigate to the edit page
      }
    });
  };

  // Function to navigate to the edit page
  const onEdit = (taskId) => {
    history.push(`/edit/${taskId}`);
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3}>
        <Typography variant="h5" align="center" gutterBottom style={{ marginRight: '1rem' }}>
          Tasks List
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginLeft: '20px', marginRight: '20px', alignItems: 'center', marginBottom: '1rem' }}>
          <Typography variant="h6">
            Task List
          </Typography>
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
        <div style={{ overflowX: 'auto' }}>
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
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <Button variant="contained" color="primary" onClick={() => confirmEdit(task)} sx={{ p: '0.5rem' }}>
                        Edit
                      </Button>
                      <Button variant="contained" color="secondary" onClick={() => confirmDelete(task._id)} sx={{ p: '0.5rem', marginRight: '8px' }}>
                        Delete
                      </Button>
                    </div>
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
