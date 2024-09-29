const express = require('express');
const {
    allTasksOfUser,
    task,
    createTask,
    editTask,
    deleteTask,
    changeTaskStatus,
} = require('../controllers/taskControllers');
const { isAuthenticated } = require('../middlewares/auth');
const router = express.Router();

router.use(isAuthenticated);

router.get('/', allTasksOfUser);

router.post('/', createTask);

router.get('/:taskId', task);

router.put('/:taskId', editTask);

router.delete('/:taskId', deleteTask);

router.patch('/:taskId/status', changeTaskStatus);

module.exports = router;
