import React from 'react'
import AddTaskModal from './AddTaskModal'
import { openAddTaskModal } from '../../slices/taskSlice'
import { useDispatch } from 'react-redux'

const AddTask = ({fetchTasks}) => {

    const dispatch = useDispatch()

    const handleOpenAddTaskModal = () => {
        dispatch(openAddTaskModal())
    }

    return (
        <>

            <div className="mx-4">
                <button onClick={handleOpenAddTaskModal}  className="bg-blue-600 font-semibold rounded-sm px-12 py-1.5 text-base text-white">Add Task</button>
            </div>

            <AddTaskModal fetchTasks={fetchTasks} />

        </>



    )
}

export default AddTask