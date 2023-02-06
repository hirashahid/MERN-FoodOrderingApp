import axios from 'axios'

export const placeOrder = (values) => async (dispatch, getState) => {
    dispatch({ type: 'PLACE_ORDER_REQUEST' })
    const currentUser = getState().loginUserReducer.currentUser
    const cartItems = getState().cartReducer.cartItems
    try {
        await axios.post('/api/orders/placeOrder', { values, currentUser, cartItems });
        dispatch({ type: 'PLACE_ORDER_SUCCESS' })
    } catch (error) {
        dispatch({ type: 'PLACE_ORDER_FAILED' })
    }
}

export const getUserOrders = () => async (dispatch, getState) => {
    const currentUser = getState().loginUserReducer.currentUser
    dispatch({ type: 'GET_USER_ORDERS_REQUEST' })
    try {
        const response = await axios.post('/api/orders/getuserorders', { userId: currentUser._id })
        dispatch({ type: 'GET_USER_ORDERS_SUCCESS', payload: response.data })
    } catch (err) {
        dispatch({ type: 'GET_USER_ORDERS_FAILED', payload: err })
    }
}

export const getAllOrders = () => async (dispatch, getState) => {
    dispatch({ type: 'ALL_ORDERS_REQUEST' })
    try {
        const response = await axios.get('/api/orders/getallorders')
        dispatch({ type: 'ALL_ORDERS_SUCCESS', payload: response.data })
    } catch (err) {
        dispatch({ type: 'ALL_ORDERS_FAILED', payload: err })
    }
}

export const changeStatus = (orderID, status, currentStatus) => async (dispatch, getState) => {
    var allow = false;
    if ((currentStatus === 'Ordered' || currentStatus === 'Paid') && status === 'Cancelled') allow = true;
    if (currentStatus === 'Ordered' && status === 'Paid') allow = true;
    if (currentStatus === 'Paid' && status === 'Completed') allow = true;
    if (allow) {
        dispatch({ type: 'GET_ALL_ORDERS_REQUEST' })
        try {
            await axios.post('/api/orders/changeStatus', { orderID: orderID, status: status })
            const orders = await axios.get('/api/orders/getallorders')
            dispatch({ type: 'GET_ALL_ORDERS_SUCCESS', payload: orders.data })
            window.location.href = '/admin/allorders'
        } catch (err) {
            dispatch({ type: 'GET_ALL_ORDERS_FAILED', payload: err })
        }
    }
    else {
        alert('Status Cannot be changed')
        window.location.reload();
    }

}

export const filterbyStatus = (status) => async dispatch => {
    console.log('s: ' + status);
    try {
        const response = await axios.get('/api/orders/getallorders')
        if (status !== 'All') {
            var filteredOrder = response.data.filter(order => order.status === status);
        }

        dispatch({ type: 'ALL_ORDERS_SUCCESS', payload: filteredOrder })
    } catch (error) {
        dispatch({ type: 'ALL_ORDERS_FAILED', payload: error })
    }
}