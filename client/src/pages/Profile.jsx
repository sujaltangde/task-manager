import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUser } from '../actions/userActions';

const Profile = () => {
    const { user } = useSelector(state => state.user)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUser())
    }, [])

    return (
        <div className="pt-16 min-h-screen flex flex-col items-center">
            <div className="absolute top-20 left-8">
                <Link to="/" className="border border-gray-800 px-12 py-2 font-semibold rounded-full">Back</Link>
            </div>
           {user && <div className="mt-12 flex justify-center items-center flex-col">
                <img
                    src={user.avatar}
                    alt="User Avatar"
                    className="w-44 h-44 rounded-full mb-4"
                />
                <h1 className="text-2xl font-semibold mb-2">
                    {`${user.firstName} ${user.lastName}`}
                </h1>
                <p className="text-gray-600 text-xl">{user.email}</p>
            </div>}
        </div>
    );
};

export default Profile;
