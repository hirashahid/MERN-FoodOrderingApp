import axios from 'axios';

export const addToCart = (item, quantity, varient, currentUser) => async (dispatch) => {
    if (currentUser) {
        let cartItem = {
            name: item.name,
            userId: currentUser._id,
            itemId: item._id,
            image: item.image,
            varient: varient,
            quantity: Number(quantity),
            price: item.prices[0][varient] * quantity,
            prices: item.prices,
            category: item.category,
            restaurant: item.restaurant
        }

        if (cartItem.quantity > 10) alert('You cannot add more than 10 quantities')
        else {
            if (cartItem.quantity < 1) {
                const response = await axios.post('/api/cart/deleteFromCart', cartItem)
                dispatch({ type: 'DELETE_FROM_CART', payload: item })
            }
            else {
                dispatch({ type: 'ADD_TO_CART', payload: cartItem });
                try {
                    const response = await axios.post('/api/cart/addToCart', cartItem)
                    // dispatch({ type: 'ADD_TO_CART_SUCCESS', payload: response.data });
                }
                catch (error) {
                    dispatch({ type: 'ADD_TO_CART_FAILED', payload: error });
                }
            }
        }
    }
    else {
        let anoncartItem = {
            name: item.name,
            itemId: item._id,
            image: item.image,
            varient: varient,
            quantity: Number(quantity),
            price: item.prices[0][varient] * quantity,
            prices: item.prices,
            category: item.category,
            restaurant: item.restaurant
        }

        if (anoncartItem.quantity > 10) alert('You cannot add more than 10 quantities')
        else {
            if (anoncartItem.quantity < 1) {
                const cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
                if (cartItems.length) {
                    for (let i = 0; i < cartItems.length; i++) {
                        if (cartItems[i].name === anoncartItem.name && cartItems[i].varient === anoncartItem.varient) var position = i;
                    }
                    if (position != undefined) cartItems.splice(position, 1);
                    localStorage.setItem('cartItems', JSON.stringify(cartItems))
                    dispatch({ type: 'ADD_TO_CART_ANON', payload: cartItems });
                }
            }
            else {
                const cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
                if (cartItems.length) {
                    for (let i = 0; i < cartItems.length; i++) {
                        if (cartItems[i].name === anoncartItem.name && cartItems[i].varient === anoncartItem.varient) var position = i;
                    }
                    if (position != undefined) cartItems.splice(position, 1);
                }
                cartItems.push(anoncartItem)
                localStorage.setItem('cartItems', JSON.stringify(cartItems))
                dispatch({ type: 'ADD_TO_CART_ANON', payload: cartItems });
            }
        }
    }
}

export const getCartItems = (currentUser) => async (dispatch) => {
    if (currentUser) {
        dispatch({ type: 'GET_CART_REQUEST' })
        try {
            const response = await axios.post('/api/cart/getCart', currentUser)
            dispatch({ type: 'GET_CART_SUCCESS', payload: response.data })
        } catch (err) {
            dispatch({ type: 'GET_CART_FAILED', payload: err })
        }
    }

}

export const deleteFromCart = (item, currentUser) => async (dispatch) => {
    if (currentUser) {
        dispatch({ type: 'DELETE_FROM_CART', payload: item })
        try {
            const response = await axios.post('/api/cart/deleteFromCart', item)
            dispatch({ type: 'DELETE_FROM_CART_SUCCESS', payload: response.data })
        }
        catch (error) {
            console.log(error);
        }
    }
    else {
        const cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
        if (cartItems.length) {
            for (let i = 0; i < cartItems.length; i++) {
                if (cartItems[i].name === item.name && cartItems[i].varient === item.varient) var position = i;
            }
            if (position != undefined) cartItems.splice(position, 1);
            localStorage.setItem('cartItems', JSON.stringify(cartItems))
            dispatch({ type: 'DELETE_FROM_CART_ANON', payload: cartItems });
        }
    }

};

export const clearCart = (currentUser) => async (dispatch) => {
    dispatch({ type: 'CLEAR_CART' })
    try {
        const response = await axios.post('/api/cart/clearCart', currentUser)
        console.log(`response: ${response}`);
    }
    catch (error) {
        console.log(error);
    }
}

export const deleteSelectedItems = (selectedItems) => async (dispatch) => {
    if (selectedItems.length === 0) alert('No item has been selected')
    else {
        try {
            const response = await axios.post('/api/cart/deleteSelectedItems', selectedItems)
            window.location.reload()
            console.log(`response: ${response}`);
        }
        catch (error) {
            console.log(error);
        }
    }

}