const Task = require('../models/taskModel');
const { body, param } = require('express-validator');

exports.validateTaskCreation = [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
];

exports.validateTaskId = [
  param('taskId').isMongoId().withMessage('Invalid Task ID'),
];


// Get all tasks for a specific user
exports.allTasksOfUser = async (req, res, next) => {
  try {
    const tasks = await Task.find({ userId: req.user._id });

    return res.status(200).json({
      success: true,
      message: "Tasks fetched successfully",
      tasks
    });
  } catch (error) {
    next(error);
  }
};

// Get a specific task by ID
exports.task = async (req, res, next) => {
  const { taskId } = req.params;

  try {
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }
    return res.status(200).json({
      success: true,
      message: "Task fetched successfully!",
      task
    });
  } catch (error) {
    next(error);
  }
};

// Create a new task
exports.createTask = async (req, res, next) => {
  const { title, description } = req.body;

  try {
    const newTask = new Task({
      title,
      description,
      userId: req.user._id,
    });
    await newTask.save();
    return res.status(201).json({
      success: true,
      message: "Task created successfully!",
      newTask
    });
  } catch (error) {
    next(error);
  }
};

// Edit an existing task
exports.editTask = async (req, res, next) => {
  const { taskId } = req.params;
  const { title, description } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { title, description },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res.status(200).json({
      success: true,
      message: "Task edited successfully!",
      updatedTask
    });
  } catch (error) {
    next(error);
  }
};

// Delete a task
exports.deleteTask = async (req, res, next) => {
  const { taskId } = req.params;

  try {
    const deletedTask = await Task.findByIdAndDelete(taskId);
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully!",
      deletedTask
    });
  } catch (error) {
    next(error);
  }
};


exports.changeTaskStatus = async (req, res, next) => {
  const { taskId } = req.params;
  const { status } = req.body;

  if (!status) {
    const error = new Error("Status is required");
    error.status = 400;
    return next(error);
  }

  // Check if status is valid
  if (!['todo', 'in-progress', 'done'].includes(status)) {
    const error = new Error("Status should be one of: 'todo', 'in-progress', 'done'");
    error.status = 400;
    return next(error);
  }

  try {

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res.status(200).json({
      success: true,
      message: `Task status changed to ${status}`,
      updatedTask
    });
  } catch (error) {
    next(error); // Pass the error to the error-handling middleware
  }
};
