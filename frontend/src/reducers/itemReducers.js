export const getAllItemsReducer = (state = { items: [] }, action) => {
    switch (action.type) {
        case 'GET_ITEM_REQUEST': return {
            loading: true,
            ...state
        }
        case 'GET_ITEM_SUCCESS': return {
            loading: false,
            items: action.payload
        }
        case 'GET_ITEM_FAILED': return {
            loading: false,
            error: action.payload
        }
        default: return state
    }
}

export const addItemsReducer = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_ITEM_REQUEST': return {
            loading: true,
            ...state
        }
        case 'ADD_ITEM_SUCCESS': return {
            loading: false,
            success: action.payload
        }
        case 'ADD_ITEM_FAILED': return {
            loading: false,
            error: action.payload
        }
        default: return state
    }
}

export const getItemByIdReducer = (state = { item: [] }, action) => {
    switch (action.type) {
        case 'GET_ITEM_BY_ID_REQUEST': return {
            loading: true,
            ...state
        }
        case 'GET_ITEM_BY_ID_SUCCESS': return {
            loading: false,
            item: action.payload
        }
        case 'GET_ITEM_BY_ID_FAILED': return {
            loading: false,
            error: action.payload
        }
        default: return state
    }
}

export const editItemReducer = (state = {}, action) => {
    switch (action.type) {
        case 'EDIT_ITEM_REQUEST': return {
            editLoading: true,
            ...state
        }
        case 'EDIT_ITEM_SUCCESS': return {
            editLoading: false,
            editSuccess: true
        }
        case 'EDIT_ITEM_FAILED': return {
            editLoading: false,
            editError: action.payload
        }
        default: return state
    }
}

