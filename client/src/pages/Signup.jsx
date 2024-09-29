import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { googleAuth, signup } from '../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';

const Signup = () => {
    const { isAuthenticated, authLoading } = useSelector((state) => state.user);
    const [userData, setUserData] = useState({});
    const [avatar, setAvatar] = useState(null); // State to hold the selected avatar

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Navigate to home if user is authenticated
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    const handleSignup = (e) => {
        e.preventDefault();

        // Include the avatar file in userData
        const dataToSend = { ...userData, avatar }; // Assuming you want to send the raw file, if base64 then convert it

        dispatch(signup(dataToSend));
    };

    const handleGoogleSignup = () => {
        dispatch(googleAuth());
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                // Convert the file to base64 and update state
                setAvatar(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <div className="min-h-screen pt-14 pb-12">
                <div className="flex justify-center items-center">
                    <div className="sm:w-1/3 w-full mt-7 sm:mx-0 mx-8">
                        <p className="font-bold text-blue-600 text-3xl">Signup</p>
                        <div className="shadow-sm border mt-2 shadow-blue-600 rounded-md border-blue-600 p-5">
                            <form onSubmit={handleSignup} className="flex flex-col gap-5">

                                <input
                                    onChange={(e) =>
                                        setUserData((prev) => ({
                                            ...prev,
                                            firstName: e.target.value,
                                        }))
                                    }
                                    required
                                    className="border outline-none border-gray-500 px-3 py-2"
                                    type="text"
                                    placeholder='First Name'
                                />
                                <input
                                    onChange={(e) =>
                                        setUserData((prev) => ({
                                            ...prev,
                                            lastName: e.target.value,
                                        }))
                                    }
                                    required
                                    className="border outline-none border-gray-500 px-3 py-2"
                                    type="text"
                                    placeholder='Last Name'
                                />
                                <input
                                    onChange={(e) =>
                                        setUserData((prev) => ({
                                            ...prev,
                                            email: e.target.value,
                                        }))
                                    }
                                    required
                                    className="border outline-none border-gray-500 px-3 py-2"
                                    type="email"
                                    placeholder='Email'
                                />
                                <input
                                    onChange={(e) =>
                                        setUserData((prev) => ({
                                            ...prev,
                                            password: e.target.value,
                                        }))
                                    }
                                    required
                                    className="border outline-none border-gray-500 px-3 py-2"
                                    type="password"
                                    placeholder='Password'
                                />
                                <input
                                    onChange={(e) =>
                                        setUserData((prev) => ({
                                            ...prev,
                                            confirmPassword: e.target.value,
                                        }))
                                    }
                                    required
                                    className="border outline-none border-gray-500 px-3 py-2"
                                    type="password"
                                    placeholder='Confirm Password'
                                />

                                {/* Avatar Input */}
                                <div>
                                    <label htmlFor='avatar' className="font-semibold text-gray-700">Select Avatar</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        name="avatar"
                                        onChange={handleAvatarChange}
                                        className=" outline-none border-gray-500 px-3 py-2"
                                        required
                                    />
                                </div>
                                {/* Render selected avatar */}
                                {avatar && (
                                    <img
                                        src={avatar}
                                        alt="Selected Avatar"
                                        className="mt-3 w-24 h-24 object-cover rounded-full"
                                    />
                                )}

                                <button  disabled={authLoading}  type="submit" className='w-full py-2 bg-blue-600 text-white font-semibold'>
                                {authLoading ? "Loading..." : "Signup"}
                                </button>

                                <div className="flex flex-col items-center justify-center gap-3">
                                    <p className="font-semibold">Already have an account? <Link to="/login" className="text-blue-600">Login</Link></p>
                                    <button disabled={authLoading} type="button" onClick={handleGoogleSignup} className="text-white py-2 rounded-md bg-blue-600 px-3 text-sm font-semibold">Signup with Google</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Signup;
