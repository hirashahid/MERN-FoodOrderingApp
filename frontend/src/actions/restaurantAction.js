import axios from 'axios';

export const getRestaurant = () => async dispatch => {
    dispatch({ type: 'GET_RESTAURANT_REQUEST' })
    try {
        const response = await axios.get('/api/restaurant/getrestaurant')
        dispatch({ type: 'GET_RESTAURANT_SUCCESS', payload: response.data })
    } catch (err) {
        dispatch({ type: 'GET_RESTAURANT_FAILED', payload: err })
    }
}

export const addRestaurant = (restaurant) => async dispatch => {
    dispatch({ type: 'ADD_RESTAURANT_REQUEST' })
    try {
        const response = await axios.post('/api/restaurant/addrestaurant', { restaurant })
        dispatch({ type: 'ADD_RESTAURANT_SUCCESS', payload: response.data })
        window.location.reload();
    } catch (err) {
        dispatch({ type: 'ADD_RESTAURANT_FAILED', payload: err })
    }
}