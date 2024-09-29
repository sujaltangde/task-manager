import { createSlice } from "@reduxjs/toolkit";

// Define initialState outside the slice
const initialState = {
    loading: false,
    error: null,
    task: {
        _id: "",
        title: "",
        description: "",
        status: "",
        userId: "",
        createdAt: "",
        updatedAt: ""
    },
    showAddTaskModal: false,
    showEditTaskModal: false,
    showViewTaskModal: false
};

const taskSlice = createSlice({
    name: 'Task',
    initialState,
    reducers: {
        openAddTaskModal: (state) => {
            state.showAddTaskModal = true;
        },
        closeAddTaskModal: (state) => {
            state.showAddTaskModal = false;
        },
        openEditTaskModal: (state) => {
            state.showEditTaskModal = true;
        },
        closeEditTaskModal: (state) => {
            state.showEditTaskModal = false;
            state.task = {
                _id: "",
                title: "",
                description: "",
                status: "",
                userId: "",
                createdAt: "",
                updatedAt: ""
            }
        },
        openViewTaskModal: (state) => {
            state.showViewTaskModal = true;
        },
        closeViewTaskModal: (state) => {
            state.showViewTaskModal = false;
            state.task = {
                _id: "",
                title: "",
                description: "",
                status: "",
                userId: "",
                createdAt: "",
                updatedAt: ""
            }
        },
        getTaskSuccess: (state, action) => {
            state.task = action.payload;
        },
        updateTasks: (state, action) => {
            console.log(action.payload)
            state.allTasks = action.payload; // Update allTasks with the new task structure
        },


    }
});

export const {
    openAddTaskModal,
    closeAddTaskModal,
    openEditTaskModal,
    closeEditTaskModal,
    openViewTaskModal,
    closeViewTaskModal,
    getTaskSuccess,
    updateTasks
} = taskSlice.actions;

export default taskSlice.reducer;
