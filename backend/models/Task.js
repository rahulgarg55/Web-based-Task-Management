/*
  Task Model

  This file defines the Mongoose schema for tasks. Each task has properties including title,
  description, due date, and status.

*/
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dueDate: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('tasks', taskSchema);
