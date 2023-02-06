export const getCategoriesReducer = (state = { categories: [] }, action) => {
    switch (action.type) {
        case 'GET_CATEGORY_REQUEST': return {
            loading: true,
            ...state
        }
        case 'GET_CATEGORY_SUCCESS': return {
            loading: false,
            categories: action.payload
        }
        case 'GET_CATEGORY_FAILED': return {
            loading: false,
            error: action.payload
        }
        default: return state
    }
}

export const addCategoryReducer = (state = { categories: [] }, action) => {
    switch (action.type) {
        case 'GET_CATEGORY_REQUEST': return {
            loading: true,
            ...state
        }
        case 'GET_CATEGORY_SUCCESS': return {
            loading: false,
            categories: action.payload
        }
        case 'GET_CATEGORY_FAILED': return {
            loading: false,
            error: action.payload
        }
        default: return state
    }
}