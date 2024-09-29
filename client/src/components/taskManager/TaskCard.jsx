import React from 'react'
import { useDispatch } from 'react-redux';
import { openViewTaskModal, openEditTaskModal } from '../../slices/taskSlice'
import { deleteTask, getTask } from '../../actions/taskActions';

const TaskCard = ({ task, provided, fetchTasks }) => {

    const dispatch = useDispatch()

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);

        // Format date using toLocaleString with custom options
        const formattedDate = date.toLocaleString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false, // 24-hour format
        });

        return formattedDate;
    }

    const handleDeleteTask = () => {
        dispatch(deleteTask(task._id, fetchTasks))
    }

    

    const handleEditTask = () => {
        dispatch(getTask(task._id))
        dispatch(openEditTaskModal())
    }

    const handleTaskDetails = () => {
        dispatch(getTask(task._id))
        dispatch(openViewTaskModal())
    }

    return (
        <>
            <div
                className="bg-blue-200 p-4 rounded shadow task flex flex-col justify-between h-44"
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
            >
                <div>
                    <p className="font-bold text-2xl">{task.title}</p>
                    <p>{task.description}</p>
                </div>

                <div>
                    <p className="text-sm">Created at: {formatDate(task.createdAt)}</p>
                    <div className="flex items-center gap-2 justify-end mt-1">
                        <button onClick={handleDeleteTask} className="bg-red-600 font-semibold text-white rounded-md text-sm py-1 px-2">Delete</button>
                        <button onClick={handleEditTask} className="bg-blue-600 font-semibold text-white rounded-md text-sm py-1 px-2">Edit</button>
                        <button onClick={handleTaskDetails} className="bg-blue-700 font-semibold text-white rounded-md text-sm py-1 px-2">View Details</button>
                    </div>
                </div>
            </div>

            
           
        </>
    )
}

export default React.memo(TaskCard)