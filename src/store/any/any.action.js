
import { anyService } from '../../services/any/any.service'

// Any Action Creators
function getActionSetAny(any) {
    return { type: 'SET_ANY', any }
}

function getActionRemoveAny(anyId) {
    return { type: 'CLEAR_ANY', anyId }
}

//Anys Action Creators
function getActionSetAnys(anys) {
    return { type: 'SET_ANYS', anys }
}
function getActionAddMini(any) {

    return { type: 'ADD_ANY', any }
}
function getActionRemoveMini(any) {
    return { type: 'REMOVE_ANY', any }
}
function getActionUpdateMini(any) {
    return { type: 'UPDATE_ANY', any }
}

//load anys to state
export function loadAnyAnys() {
    return async dispatch => {
        try {
            // console.log('hello')
            const anys = await anyService.query()
            dispatch(getActionSetAnys(anys))
            return anys
        } catch (err) {
            console.log('AnyActions: err in loadAny', err)
        }
    }
}

//load any to state
export function loadAny(anyId) {
    return async dispatch => {
        try {
            const any = await anyService.getById(anyId)
            dispatch(getActionSetAny(any))
            return any
        } catch (err) {
            console.log('AnyActions: err in loadAny', err)
            throw err
        }
    }
}

export function addAny(any) {
    return async dispatch => {
        try {
            const addedAny = await anyService.save(any)
            return addedAny
        }
        catch {
        }
    }
}

export function updateMini(any) {
    return async dispatch => {
        const newMini = anysService.saveMiniAny(any)
        dispatch(getActionUpdateMini(newMini))
    }
}

export function updateAny(newAny) {
    return async (dispatch, getState) => {
        const prevAny = { ...getState().anyModule.any }
        try {
            dispatch(getActionSetAny(newAny))
            await anyService.save(newAny)
        } catch (error) {
            dispatch(getActionSetAny(prevAny))
            console.error('Had en error setting any', error)
        }
    }
}

export function clearAny() {
    return (dispatch, getState) => {
        dispatch(getActionSetAny(null))
    }
}
