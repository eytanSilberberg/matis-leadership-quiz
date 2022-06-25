const initialState = {
    anys: null
}

export function anyReducer(state = initialState, action = {}) {
    switch (action.type) {
        case 'SET_ANYS':
            return { ...state, anys: action.anys }
        case 'ADD_ANY':
            return { ...state, anys: [action.anys, ...state.anys] }
        case 'REMOVE_ANY':
            return { ...state, anys: state.anys.filter(any => any._id !== action.anyId) }
        case 'UPDATE_ANY':
            return {
                ...state,
                anys: state.anys.map(any =>
                    any._id === action.any._id ? action.any : any
                )
            }
        case 'SET_ANY':
            return { ...state, any: action.any }
        case 'CLEAR_ANY':
            return { ...state, any: null }
        default:
            return state
    }

}
