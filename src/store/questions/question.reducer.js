const initialState = {
    questions: null
}

export function questionReducer(state = initialState, action = {}) {
    switch (action.type) {
        case 'SET_QUESTIONS':
            return { ...state, questions: action.questions }
        case 'ADD_QUESTION':
            return { ...state, questions: [action.questions, ...state.questions] }
        case 'REMOVE_QUESTION':
            return { ...state, questions: state.questions.filter(question => question._id !== action.questionId) }
        case 'UPDATE_QUESTION':
            return { ...state, questions: state.questions.map(question => question._id === action.question._id ? action.question : question) }
        case 'SET_QUESTION':
            return { ...state, question: action.question }
        case 'CLEAR_QUESTION':
            return { ...state, question: null }
        default:
            return state
    }

}
