import axios from 'axios'
import {
    openAddTaskModal,
    closeAddTaskModal,
    openEditTaskModal,
    closeEditTaskModal,
    openViewTaskModal,
    closeViewTaskModal,
    getTaskSuccess
} from '../slices/taskSlice'
import { toast } from 'react-toastify'


const API_KEY = import.meta.env.VITE_API_KEY;


export const addNewTask = (taskData, fetchTasks) => async (dispatch) => {
    try {

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }
        const response = await axios.post(`${API_KEY}/api/tasks`, taskData, config);

        if (response.status === 201) {
            toast.success(response.data.message)
            fetchTasks()
            dispatch(closeAddTaskModal())

        }


    } catch (error) {
        toast.success(error.response.data.message)
    }
}
export const getTask = (taskId) => async (dispatch) => {
    try {

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }
        const response = await axios.get(`${API_KEY}/api/tasks/${taskId}`, config);

        if (response.status === 200) {
            dispatch(getTaskSuccess(response.data.task))
        }


    } catch (error) {
        toast.success(error.response.data.message)
    }
}

export const editTask = (taskData, taskId, fetchTasks) => async (dispatch) => {
    try {

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }
        const response = await axios.put(`${API_KEY}/api/tasks/${taskId}`, taskData, config);

        if (response.status === 200) {
            toast.success(response.data.message)
            fetchTasks()
            dispatch(closeEditTaskModal())
        }


    } catch (error) {
        toast.success(error.response.data.message)
    }
}
export const deleteTask = (taskId, fetchTasks) => async (dispatch) => {
    try {

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }
        const response = await axios.delete(`${API_KEY}/api/tasks/${taskId}`, config);

        if (response.status === 200) {
            toast.success(response.data.message)
            fetchTasks()
            dispatch(getAllTasks())
        }


    } catch (error) {
        toast.success(error.response.data.message)
    }
}

export const changeTaskStatus = (taskId, status) => async (dispatch) => {
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }
    try {
        await axios.patch(`${API_KEY}/api/tasks/${taskId}/status`, {
            status
        }, config);
    } catch (error) {
        toast.error(error.response.data.message)
    }
}
