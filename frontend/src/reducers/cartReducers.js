export const cartReducer = (state = { cartItems: [] }, action) => {

    switch (action.type) {
        case 'ADD_TO_CART':
            const alreadyExists = state.cartItems.find(item => item.name === action.payload.name && item.varient === action.payload.varient)
            if (alreadyExists) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(item => item.name === action.payload.name && item.varient === action.payload.varient ? action.payload : item),
                    success: true
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, action.payload],
                    success: true
                }
            }
        // case 'ADD_TO_CART_SUCCESS': return {
        //     loading: false,
        //     success: action.payload
        // }
        case 'ADD_TO_CART_FAILED': return {
            loading: false,
            error: action.payload
        }
        case 'ADD_TO_CART_ANON': return {
            cartItems: action.payload
        }
        case 'DELETE_FROM_CART_ANON': return {
            cartItems: action.payload
        }
        case 'DELETE_FROM_CART': return {
            ...state,
            cartItems: state.cartItems.filter(item => item._id !== action.payload._id)
        }
        case 'CLEAR_CART': return {
            cartItems: []
        }
        case 'GET_CART_REQUEST': return {
            loading: true,
            ...state
        }
        case 'GET_CART_SUCCESS': return {
            loading: false,
            cartItems: action.payload
        }
        case 'GET_CART_FAILED': return {
            loading: false,
            error: action.payload
        }
        default: return state
    }
}
