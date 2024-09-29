import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { googleAuth, login } from '../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'

const Login = () => {

    const { isAuthenticated } = useSelector((state) => state.user);
    const [userData, setUserData] = useState({})

    const dispatch = useDispatch()
    const navigate = useNavigate();

    // Get isAuthenticated state from Redux store

    // Navigate to home if user is authenticated
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate])

    const handleLogin = (e) => {
        e.preventDefault()

        dispatch(login(userData))

        console.log({ userData })
    }

    const handleGoogleLogin = () =>{
        dispatch(googleAuth())
    }

    return (
        <>
            <div className="min-h-screen pt-14 ">


                <div className="flex justify-center  items-center">

                    <div className="sm:w-1/3 w-full mt-7 sm:mx-0 mx-8">
                        <p className="font-bold text-blue-600 text-3xl">Login</p>
                        <div className="shadow-sm border mt-2 shadow-blue-600 rounded-md border-blue-600  p-5">
                            <form onSubmit={handleLogin} className="flex flex-col gap-5" >
                                <input onChange={(e) =>
                                    setUserData((prev) => ({
                                        ...prev,
                                        email: e.target.value,
                                    }))
                                } required className="border outline-none border-gray-500 px-3 py-2" type="email" placeholder='Email' />

                                <input
                                    onChange={(e) =>
                                        setUserData((prev) => ({
                                            ...prev,
                                            password: e.target.value,
                                        }))
                                    }
                                    required  className="border outline-none border-gray-500 px-3 py-2" type="password" placeholder='Password' />

                                <button type="submit" className='w-full py-2 bg-blue-600 text-white font-semibold'>
                                    Login
                                </button>

                                <div className="flex flex-col items-center justify-center gap-3">
                                    <p className="font-semibold">Don't have an account? <Link to="/signup" className="text-blue-600">Signup</Link></p>
                                    <button type="button" onClick={handleGoogleLogin} className="text-white py-2 rounded-md bg-blue-600 px-3 text-sm font-semibold">Login with Google</button>
                                </div>

                            </form>
                        </div>
                    </div>

                </div>

            </div>

        </>
    )
}

export default Login