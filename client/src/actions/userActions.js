import axios from 'axios'
import { registerRequest, registerSuccess, registerFail, loginRequest, loginSuccess, loginFail, verifyLoginSuccess, verifyLoginFail, getUserRequest, getUserSuccess, getUserFail } from '../slices/userSlice'
import { toast } from 'react-toastify'
import { signInSignUpWithGoogle } from '../firebase';


const API_KEY = import.meta.env.VITE_API_KEY;


export const login = (userData) => async (dispatch) => {
    try {
        dispatch(loginRequest());

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const response = await axios.post(`${API_KEY}/api/user/login`, userData, config);

        console.log(response.status)

        if (response.status === 200) {
            localStorage.setItem('token', response.data.data.token);
            dispatch(loginSuccess());
            localStorage.setItem('authState', 'true')
            dispatch(verify())
            toast.success(response.data.message);
        }



    } catch (err) {
        dispatch(loginFail(err.response.data.message));
        console.log(err);
        toast.error(err.response.data.message);
    }
};

export const signup = (userData) => async (dispatch) => {
    try {

        dispatch(registerRequest())


        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const response = await axios.post(`${API_KEY}/api/user/register`, userData, config)


        if (response.status === 201) {
            localStorage.setItem('token', response.data.data.token);
            dispatch(registerSuccess());
            localStorage.setItem('authState', 'true')
            dispatch(verify())
            toast.success(response.data.message);
        } else {
            toast.error(response.data.message);
        }

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

        const response = await axios.get(`${API_KEY}/api/user/auth/verify`, config);

        console.log(response)

        if (response.status === 200) {
            dispatch(verifyLoginSuccess(response.data))
        }
    } catch (err) {
        dispatch(verifyLoginFail())
    }
}

export const googleAuth = () => async (dispatch) => {

    try {

        const token = await signInSignUpWithGoogle();
        
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            const { status, data } = await axios.post(`${API_KEY}/api/user/auth/firebase-auth`, {token}, config);

            if (status === 200) {
                localStorage.setItem('token', data.token);
                dispatch(loginSuccess());
                localStorage.setItem('authState', 'true')
                dispatch(verify())
                toast.success(data.message);
            }


        } catch (err) {
            console.error(err);
            dispatch(loginFail(err.response.data.message));
            toast.error(err.response.data.message)
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

        const { data } = await axios.put(`${API_KEY}/api/user/update`, updatedUserData, config);

        dispatch(editUserSuccess())
        dispatch(getUser())

        toast.success("Profile Updated Successfully!");


    } catch (err) {
        dispatch(editUserFail(err.response.data.message));
        toast.error(err.response.data.message);
    }
}