import axios from 'axios';

export const getCategories = () => async dispatch => {
    dispatch({ type: 'GET_CATEGORY_REQUEST' })
    try {
        const response = await axios.get('/api/category/getcategories')
        dispatch({ type: 'GET_CATEGORY_SUCCESS', payload: response.data })
    } catch (err) {
        dispatch({ type: 'GET_CATEGORY_FAILED', payload: err })
    }
}

export const addcategory = (category) => async dispatch => {
    dispatch({ type: 'ADD_CATEGORY_REQUEST' })
    try {
        const response = await axios.post('/api/category/addcategory', { category })
        dispatch({ type: 'ADD_CATEGORY_SUCCESS', payload: response.data })
        window.location.reload();
    } catch (err) {
        dispatch({ type: 'ADD_CATEGORY_FAILED', payload: err })
    }
}