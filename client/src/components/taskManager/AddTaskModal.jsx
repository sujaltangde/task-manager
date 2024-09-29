import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeAddTaskModal } from '../../slices/taskSlice';
import { addNewTask } from '../../actions/taskActions';

const AddTaskModal = ({fetchTasks}) => {
  const { showAddTaskModal } = useSelector(state => state.task);
  const [taskData, setTaskData] = useState({})
  const dispatch = useDispatch();
  const modalRef = useRef(null);

  // Handle close when clicking outside the modal
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      handleClose();
    }
  };

  // Close modal
  const handleClose = () => {
    dispatch(closeAddTaskModal());
  };

  // Lock scroll when modal is open
  useEffect(() => {
    if (showAddTaskModal) {
      document.body.classList.add('overflow-hidden'); // Disable scrolling
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.body.classList.remove('overflow-hidden'); // Enable scrolling
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showAddTaskModal]);



  const handleAddTask = (e) => {
    e.preventDefault()
    dispatch(addNewTask(taskData, fetchTasks))
  }

  return (
    <>
      {showAddTaskModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div
            ref={modalRef}
            className="bg-white rounded-lg shadow-lg w-96 max-w-full p-6 relative"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Add Task</h2>
              <button
                className="text-2xl font-bold text-gray-700 "
                onClick={handleClose}
              >
                &times;
              </button>
            </div>
            <div className="">
              <form onSubmit={handleAddTask} className="flex flex-col gap-4">
                <input onChange={(e) =>
                  setTaskData((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                } required type="text" placeholder='Title' className="outline-none border border-gray-600 w-full px-2 py-2 " />
                <textarea onChange={(e) =>
                  setTaskData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))} required type="text" placeholder='Description' className="outline-none border border-gray-600 w-full px-2 py-2 " />
                <button type="submit" className="bg-blue-600 w-full text-white font-semibold py-2 ">Add </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddTaskModal;
