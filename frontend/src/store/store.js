import { combineReducers } from 'redux'
import axios from 'axios';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { getAllItemsReducer, addItemsReducer, getItemByIdReducer, editItemReducer } from '../reducers/itemReducers';
import { cartReducer } from '../reducers/cartReducers';
import { registerUserReducer, loginUserReducer, getAllUsersReducer } from '../reducers/userReducer';
import { placeOrderReducer, getUserOrdersReducer, allOrdersReducer } from '../reducers/orderReducer';
import { getCategoriesReducer, addCategoryReducer } from '../reducers/categoryReducer';
import { getRestaurantReducer, addRestaurantReducer } from '../reducers/restaurantReducer';

const finalReducer = combineReducers({
    getAllItemsReducer: getAllItemsReducer,
    cartReducer: cartReducer,
    registerUserReducer: registerUserReducer,
    loginUserReducer: loginUserReducer,
    placeOrderReducer: placeOrderReducer,
    getUserOrdersReducer: getUserOrdersReducer,
    addItemsReducer: addItemsReducer,
    getItemByIdReducer: getItemByIdReducer,
    editItemReducer: editItemReducer,
    allOrdersReducer: allOrdersReducer,
    getAllUsersReducer: getAllUsersReducer,
    getCategoriesReducer: getCategoriesReducer,
    addCategoryReducer: addCategoryReducer,
    getRestaurantReducer: getRestaurantReducer,
    addRestaurantReducer: addRestaurantReducer
})

// const cart = async () => await axios.get('/api/cart/getCart') || [];

// const cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
const currentUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : null
const cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
var initialState;

if (!currentUser) {

    initialState = {
        cartReducer: {
            cartItems: cartItems
        },
    }
}
if (cartItems && currentUser) {
    cartItems.map(async (item) => {
        item.userId = currentUser._id
        await axios.post('/api/cart/addToCart', item)
    });
    localStorage.removeItem('cartItems')
    initialState = {
        loginUserReducer: {
            currentUser: currentUser
        },
    }
}
if (currentUser) {
    initialState = {
        loginUserReducer: {
            currentUser: currentUser
        },
    }
}

console.log(JSON.stringify(initialState));

const composeEnhancers = composeWithDevTools({})
const store = createStore(finalReducer, initialState, composeEnhancers(applyMiddleware(thunk)));

export default store;