import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeViewTaskModal } from '../../slices/taskSlice';

const TaskDetailsModal = () => {
  const { showViewTaskModal, task } = useSelector((state) => state.task);
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
    dispatch(closeViewTaskModal());
  };

  // Lock scroll when modal is open
  useEffect(() => {
    if (showViewTaskModal) {
      document.body.classList.add('overflow-hidden'); // Disable scrolling
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.body.classList.remove('overflow-hidden'); // Enable scrolling
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showViewTaskModal]);


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

  return (
    <>
      {showViewTaskModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div
            ref={modalRef}
            className="bg-white rounded-lg shadow-lg w-96 max-w-full p-6 relative"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Task Details</h2>
              <button
                className="text-2xl font-bold text-gray-700 "
                onClick={handleClose}
              >
                &times;
              </button>
            </div>
            <div className=" flex flex-col gap-4">

              <div>
                <p>Title:</p>
                <p>{task.title}</p>
              </div>
              <div>
                <p>Description:</p>
                <p>{task.description}</p>
              </div>
              <div>
                <p>Created At:</p>
                <p>{task.createdAt ? formatDate(task.createdAt) : ""}</p>
              </div>



            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskDetailsModal;
