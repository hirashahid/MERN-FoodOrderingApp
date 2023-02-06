import axios from 'axios';
import swal from 'sweetalert';

export const registerUser = (user) => async dispatch => {
    dispatch({ type: 'USER_REGISTER_REQUEST' })
    try {
        const response = await axios.post('/api/users/register', user)
        console.log(`response: ${response}`);
        localStorage.setItem('currentUser', JSON.stringify(response.data));
        if (response.data) window.location.href = '/'
        dispatch({ type: 'USER_REGISTER_SUCCESS', payload: response.data })
    } catch (error) {
        dispatch({ type: 'USER_REGISTER_FAILED', payload: error })
    }
}

export const loginUser = (user) => async dispatch => {
    dispatch({ type: 'USER_LOGIN_REQUEST' })
    try {
        const response = await axios.post('/api/users/login', user)
        dispatch({ type: 'USER_LOGIN_SUCCESS', payload: response.data })
        localStorage.setItem('currentUser', JSON.stringify(response.data));
        if (response.data) window.location.href = '/'
    } catch (error) {
        dispatch({ type: 'USER_LOGIN_FAILED', payload: error })
    }
}

export const logoutUser = () => dispatch => {
    localStorage.removeItem('currentUser')
    window.location.href = '/login'
}

export const getAllUsers = () => async dispatch => {
    dispatch({ type: 'GET_USERS_REQUEST' })
    try {
        const response = await axios.get('/api/users/allusers')
        dispatch({ type: 'GET_USERS_SUCCESS', payload: response.data })
    } catch (err) {
        dispatch({ type: 'GET_USERS_FAILED', payload: err })
    }
}


export const deleteUser = (userId) => async dispatch => {
    try {
        await axios.post('/api/users/deleteuser', { userId })
        swal("User has been Deleted");
        window.location.reload();
    } catch (err) {
        swal("Error while deleting User");
        console.log(err);
    }
}

export const makeAdmin = (userId) => async (dispatch, getState) => {
    dispatch({ type: 'GET_USER_REQUEST' })
    try {
        await axios.post('/api/users/makeadmin', { userId })
        const response = await axios.get('/api/users/allusers')
        dispatch({ type: 'GET_USER_SUCCESS', payload: response.data })
        window.location.reload();
    } catch (err) {
        dispatch({ type: 'GET_USER_FAILED', payload: err })
    }
}