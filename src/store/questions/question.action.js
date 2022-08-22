
import { questionService } from '../../services/questions/question.service'

// Question Action Creators
function getActionSetQuestion(question) {
    return { type: 'SET_QUESTION', question }
}

function getActionRemoveQuestion(questionId) {
    return { type: 'CLEAR_QUESTION', questionId }
}

//Questions Action Creators
function getActionSetQuestions(questions) {
    return { type: 'SET_QUESTIONS', questions }
}
function getActionAddMini(question) {

    return { type: 'ADD_QUESTION', question }
}
function getActionRemoveMini(question) {
    return { type: 'REMOVE_QUESTION', question }
}
function getActionUpdateMini(question) {
    return { type: 'UPDATE_QUESTION', question }
}

//load questions to state
export function loadQuestions() {
    return async dispatch => {
        try {
            const questions = await questionService.query()
            dispatch(getActionSetQuestions(questions))
            return questions
        } catch (err) {
            console.log('QuestionActions: err in loadQuestion', err)
        }
    }
}

//load question to state
export function loadQuestion(questionId) {
    return async dispatch => {
        try {
            const question = await questionService.getById(questionId)
            dispatch(getActionSetQuestion(question))
            return question
        } catch (err) {
            console.log('QuestionActions: err in loadQuestion', err)
            throw err
        }
    }
}

export function addQuestion(question) {
    return async dispatch => {
        try {
            const addedQuestion = await questionService.save(question)
            return addedQuestion
        }
        catch {
        }
    }
}

export function updateMini(question) {
    return async dispatch => {
        const newMini = questionService.saveMiniQuestion(question)
        dispatch(getActionUpdateMini(newMini))
    }
}

export function updateQuestion(newQuestion) {
    return async (dispatch, getState) => {
        const prevQuestion = { ...getState().questionModule.question }
        try {
            dispatch(getActionSetQuestion(newQuestion))
            await questionService.save(newQuestion)
        } catch (error) {
            dispatch(getActionSetQuestion(prevQuestion))
            console.error('Had en error setting question', error)
        }
    }
}

export function clearQuestion() {
    return (dispatch, getState) => {
        dispatch(getActionSetQuestion(null))
    }
}
