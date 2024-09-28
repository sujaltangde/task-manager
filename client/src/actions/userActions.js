import axios from 'axios'
import { registerRequest, registerSuccess, registerFail, loginRequest, loginSuccess, loginFail, verifyLoginSuccess, verifyLoginFail, getUserRequest, getUserSuccess, getUserFail } from '../slices/userSlice'
import { toast } from 'react-toastify'
import { signInSignUpWithGoogle } from '../firebase';


const API_KEY = import.meta.env.VITE_API_KEY;


export const login = (userData, setSuccessToggle) => async (dispatch) => {
    try {
        dispatch(loginRequest());

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const { data } = await axios.post(`${API_KEY}/api/auth/login`, userData, config);

        localStorage.setItem('token', data.token);

        dispatch(loginSuccess());
        setSuccessToggle(true)
        dispatch(verify())
        toast.success("Login Successful!");
    } catch (err) {
        dispatch(loginFail(err.response.data.message));
        console.log(err);
        toast.error(err.response.data.message);
    }
};

export const register = (userData, setSuccessToggle) => async (dispatch) => {
    try {

        dispatch(registerRequest())


        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const { data } = await axios.post(`${API_KEY}/api/auth/register`, userData, config)

        localStorage.setItem('token', data.token)

        dispatch(registerSuccess());
        dispatch(verify())
        toast.success("Register Successful !");
        setSuccessToggle(true)

    } catch (err) {
        dispatch(registerFail(err.response.data.message));
        console.log(err.response.data.message)
        toast.error(err.response.data.message);
    }
}

export const verify = () => async (dispatch) => {
    try {

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }

        const { data } = await axios.get(`${API_KEY}/api/auth/verify`, config);

        // console.log("data", data)

        dispatch(verifyLoginSuccess(data))


    } catch (err) {
        dispatch(verifyLoginFail())
    }
}

export const googleAuth = (setSuccessToggle) => async (dispatch) => {

    try {
        
        const token = await signInSignUpWithGoogle();
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            const { data } = await axios.post(`${API_KEY}/api/auth/firebase`, { token }, config);

            localStorage.setItem('token', data.token);

            dispatch(loginSuccess());
            setSuccessToggle(true)
            dispatch(verify())
            toast.success("Authentication Successful!");

        } catch (err) {
            console.error(err);
            dispatch(loginFail(err.response.data.message));
        }
    } catch (err) {
        console.error(err);
    }

}

export const facebookAuth = (setSuccessToggle) => async (dispatch) => {

    try {
        const token = await signInSignUpWithFacebook();
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            const { data } = await axios.post(`${API_KEY}/api/auth/firebase`, { token }, config);

            localStorage.setItem('token', data.token);

            dispatch(loginSuccess());
            setSuccessToggle(true)
            dispatch(verify())
            toast.success("Authentication Successful!");

        } catch (err) {
            console.error(err);
            dispatch(loginFail(err.response.data.message));
        }
    } catch (err) {
        console.error(err);
    }

}




export const getUser = () => async (dispatch) => {
    try {

        dispatch(getUserRequest())

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }

        const { data } = await axios.get(`${API_KEY}/api/user`, config);

        console.log("data", data.user)

        dispatch(getUserSuccess(data.user))



    } catch (err) {
        dispatch(getUserFail());
    }
}



export const editProfile = (updatedUserData) => async (dispatch) => {
    try {

        dispatch(editUserRequest())
       
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }

        const { data } = await axios.put(`${API_KEY}/api/user/update`,updatedUserData, config);

        dispatch(editUserSuccess())
        dispatch(getUser())

        toast.success("Profile Updated Successfully!");
        

    } catch (err) {
        dispatch(editUserFail(err.response.data.message));
        toast.error(err.response.data.message);
    }
}