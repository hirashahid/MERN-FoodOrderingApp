export const getRestaurantReducer = (state = { restaurants: [] }, action) => {
    switch (action.type) {
        case 'GET_RESTAURANT_REQUEST': return {
            loading: true,
            ...state
        }
        case 'GET_RESTAURANT_SUCCESS': return {
            loading: false,
            restaurants: action.payload
        }
        case 'GET_RESTAURANT_FAILED': return {
            loading: false,
            error: action.payload
        }
        default: return state
    }
}

export const addRestaurantReducer = (state = { restaurants: [] }, action) => {
    switch (action.type) {
        case 'GET_RESTAURANT_REQUEST': return {
            loading: true,
            ...state
        }
        case 'GET_RESTAURANT_SUCCESS': return {
            loading: false,
            restaurants: action.payload
        }
        case 'GET_RESTAURANT_FAILED': return {
            loading: false,
            error: action.payload
        }
        default: return state
    }
}