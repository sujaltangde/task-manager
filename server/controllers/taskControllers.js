const Task = require('../models/taskModel');

// Get all tasks for a specific user
exports.allTasksOfUser = async (req, res, next) => {
  try {
    const tasks = await Task.find({ userId: req.user._id });

    const todo = tasks.filter((task) => task.status === 'todo');
    const inProgress = tasks.filter((task) => task.status === 'inProgress');
    const done = tasks.filter((task) => task.status === 'done');

    return res.status(200).json({
      success: true,
      message: 'Tasks fetched successfully',
      tasks: {
        todo,
        inProgress,
        done,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get a specific task by ID
exports.task = async (req, res, next) => {
  const { taskId } = req.params;

  // Task ID validation
  if (!taskId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ success: false, message: 'Invalid Task ID' });
  }

  try {
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    return res.status(200).json({
      success: true,
      message: 'Task fetched successfully!',
      task,
    });
  } catch (error) {
    next(error);
  }
};

// Create a new task
exports.createTask = async (req, res, next) => {
  const { title, description } = req.body;

  // Manual validation
  const errors = [];
  if (!title || title.trim() === '') {
    errors.push({ field: 'title', message: 'Title is required' });
  }
  if (!description || description.trim() === '') {
    errors.push({ field: 'description', message: 'Description is required' });
  }

  if (errors.length > 0) {
    return res.status(400).json({ success: false, message: errors[0].message });
  }

  try {
    const newTask = new Task({
      title,
      description,
      userId: req.user._id,
    });
    await newTask.save();
    return res.status(201).json({
      success: true,
      message: 'Task added successfully!',
      newTask,
    });
  } catch (error) {
    next(error);
  }
};

// Edit an existing task
exports.editTask = async (req, res, next) => {
  const { taskId } = req.params;
  const { title, description } = req.body;

  // Task ID validation
  if (!taskId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ success: false, message: 'Invalid Task ID' });
  }

  // Manual validation for editing task
  const errors = [];
  if (!title || title.trim() === '') {
    errors.push({ field: 'title', message: 'Title is required' });
  }
  if (!description || description.trim() === '') {
    errors.push({ field: 'description', message: 'Description is required' });
  }

  if (errors.length > 0) {
    return res.status(400).json({ success: false, message: errors[0].message });
  }

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
      message: 'Task edited successfully!',
      updatedTask,
    });
  } catch (error) {
    next(error);
  }
};

// Delete a task
exports.deleteTask = async (req, res, next) => {
  const { taskId } = req.params;

  // Task ID validation
  if (!taskId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ success: false, message: 'Invalid Task ID' });
  }

  try {
    const deletedTask = await Task.findByIdAndDelete(taskId);
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res.status(200).json({
      success: true,
      message: 'Task deleted successfully!',
      deletedTask,
    });
  } catch (error) {
    next(error);
  }
};

// Change task status
exports.changeTaskStatus = async (req, res, next) => {
  const { taskId } = req.params;
  const { status } = req.body;

  // Task ID validation
  if (!taskId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ success: false, message: 'Invalid Task ID' });
  }

  // Status validation
  if (!status) {
    return res.status(400).json({ success: false, message: 'Status is required' });
  }

  if (!['todo', 'inProgress', 'done'].includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Status should be one of: 'todo', 'inProgress', 'done'",
    });
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
      updatedTask,
    });
  } catch (error) {
    next(error);
  }
};
