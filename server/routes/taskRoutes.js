const express = require('express');
const {
    allTasksOfUser,
    task,
    createTask,
    editTask,
    deleteTask,
    changeTaskStatus,
    validateTaskCreation,
    validateTaskId
} = require('../controllers/taskControllers');
const { isAuthenticated } = require('../middlewares/auth');
const router = express.Router();

router.use(isAuthenticated);

router.get('/', allTasksOfUser);

router.post('/', validateTaskCreation, createTask);

router.get('/:taskId', validateTaskId, task);

router.put('/:taskId', validateTaskId, validateTaskCreation, editTask);

router.delete('/:taskId', validateTaskId, deleteTask);

router.patch('/:taskId/status', validateTaskId, changeTaskStatus);

module.exports = router;
