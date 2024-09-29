import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";
import TaskCard from "../components/taskManager/taskCard";
import AddTask from "../components/taskManager/AddTask";
import SearchAndSort from "../components/taskManager/SearchAndSort";
import TaskDetailsModal from "../components/taskManager/TaskDetailsModal";
import EditTaskModal from "../components/taskManager/EditTaskModal";
import { useDispatch } from "react-redux";
import { changeTaskStatus } from "../actions/taskActions";

const API_KEY = import.meta.env.VITE_API_KEY;

const Home = () => {

    const [tasks, setTasks] = useState({
        todo: [],
        inProgress: [],
        done: []
    });


    const fetchTasks = async (searchTerm = "", sortOption = "recent") => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            };

            const response = await axios.get(`${API_KEY}/api/tasks`, {
                params: { search: searchTerm, sort: sortOption },
                ...config
            }); // API endpoint to get tasks
            const { todo, inProgress, done } = response.data.tasks;

            setTasks({
                todo: todo || [],
                inProgress: inProgress || [],
                done: done || []
            });
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    }

    const dispatch = useDispatch()

    useEffect(() => {
        fetchTasks();
    }, []);


    const onDragEnd = async (result) => {
        const { source, destination } = result;

        if (!destination) return;

        if (source.droppableId === destination.droppableId && source.index === destination.index) return;

        const sourceColumn = tasks[source.droppableId];
        const [movedTask] = sourceColumn.splice(source.index, 1);

        const destColumn = tasks[destination.droppableId];
        destColumn.splice(destination.index, 0, movedTask);

        dispatch(changeTaskStatus(movedTask._id, destination.droppableId))

    };

    return (
        <>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="pt-16 flex flex-col">
                    <AddTask fetchTasks={fetchTasks} />
                    <SearchAndSort fetchTasks={fetchTasks} />
                    <div className="flex sm:flex-row flex-col gap-4 p-4 columns  bg-gray-50">
                        {["todo", "inProgress", "done"].map((columnId) => (
                            <Column fetchTasks={fetchTasks} key={columnId} id={columnId} tasks={tasks[columnId]} />
                        ))}
                    </div>
                </div>
            </DragDropContext>
            <TaskDetailsModal />
            <EditTaskModal fetchTasks={fetchTasks} />
        </>
    );
};

// Column component
const Column = ({ id, tasks, fetchTasks }) => {
    const getColumnTitle = (id) => {
        switch (id) {
            case "todo": return "TODO";
            case "inProgress": return "IN PROGRESS";
            case "done": return "DONE";
            default: return "";
        }
    };

    return (
        <div className="bg-white shadow-sm  p-4 sm:w-1/3 w-full rounded-md min-h-screen">
            <h3 className="font-semibold text-base mb-4 p-2 text-white bg-blue-600">{getColumnTitle(id)}</h3>
            <Droppable droppableId={id}>
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2  min-h-full">
                        {tasks.map((task, index) => (
                            <Draggable key={task._id} draggableId={task._id.toString()} index={index}>
                                {(provided) => (
                                    <TaskCard fetchTasks={fetchTasks} task={task} provided={provided} />
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
};

export default Home;
