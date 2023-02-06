import axios from 'axios';
import swal from 'sweetalert';

export const getAllItems = () => async dispatch => {
    dispatch({ type: 'GET_ITEM_REQUEST' })
    try {
        const response = await axios.get('/api/items/getAllItems')
        dispatch({ type: 'GET_ITEM_SUCCESS', payload: response.data })
    } catch (err) {
        dispatch({ type: 'GET_ITEM_FAILED', payload: err })
    }
}

export const addItem = (item) => async dispatch => {
    dispatch({ type: 'ADD_ITEM_REQUEST' })
    try {
        const response = await axios.post('/api/items/addItem', { item })
        window.location.reload();
        dispatch({ type: 'ADD_ITEM_SUCCESS', payload: response.data })
    } catch (err) {
        dispatch({ type: 'ADD_ITEM_FAILED', payload: err })
    }
}

export const getItemById = (itemId) => async dispatch => {
    dispatch({ type: 'GET_ITEM_BY_ID_REQUEST' })
    try {
        const response = await axios.post('/api/items/getitembyid', { itemId })
        console.log('response' + response);
        dispatch({ type: 'GET_ITEM_BY_ID_SUCCESS', payload: response.data })
    } catch (err) {
        dispatch({ type: 'GET_ITEM_BY_ID_FAILED', payload: err })
    }
}

export const editItem = (updatedItem) => async dispatch => {
    dispatch({ type: 'UPDATE_ITEM_REQUEST' })
    try {
        const response = await axios.post('/api/items/editItem', { updatedItem })
        dispatch({ type: 'UPDATE_ITEM_SUCCESS', payload: response.data })
        window.location.href = '/admin/allitems'
    } catch (err) {
        dispatch({ type: 'UPDATE_ITEM_FAILED', payload: err })
    }
}


export const deleteitem = (itemId) => async dispatch => {
    try {
        await axios.post('/api/items/deleteItem', { itemId })
        swal("Item Deleted Successfully", "success");
        window.location.reload();
    } catch (err) {
        swal("Error while deleting Item");
    }
}

export const changeStatus = (itemId) => async dispatch => {
    try {
        await axios.post('/api/items/changeStatus', { itemId })
        swal("Status has been Changed", "success");
        window.location.reload();
    } catch (err) {
        swal("Error while changing status");
    }
}

export const filterItem = (searchKey, category, restaurant) => async dispatch => {
    dispatch({ type: 'GET_ITEM_REQUEST' })
    try {
        const response = await axios.get('/api/items/getAllItems')
        let filteredItem = response.data.filter(item => item.name.toLowerCase().includes(searchKey))
        if (category != 'All') {
            filteredItem = response.data.filter(item => item.category.toLowerCase() === category);
        }
        if (restaurant != 'All') {
            filteredItem = response.data.filter(item => item.restaurant === restaurant);
        }

        dispatch({ type: 'GET_ITEM_SUCCESS', payload: filteredItem })
    } catch (error) {
        dispatch({ type: 'GET_ITEM_FAILED', payload: error })
    }
}
export const filterbyCount = () => async dispatch => {
    dispatch({ type: 'GET_ITEM_REQUEST' })
    try {
        const response = await axios.get('/api/items/getAllItems')

        let filteredItem = response.data.sort((a, b) => {
            if (a.orderCount > b.orderCount) return -1;
        });

        dispatch({ type: 'GET_ITEM_SUCCESS', payload: filteredItem })
    } catch (error) {
        dispatch({ type: 'GET_ITEM_FAILED', payload: error })
    }
}