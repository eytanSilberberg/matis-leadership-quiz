import { httpService } from '../basic/http.service'
const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
    login,
    logout,
    getLoggedinUser,
    saveLocalUser,
}

window.userService = userService


async function login(userCred) {

    try {
        const user = await httpService.post('auth/login', userCred)
        return saveLocalUser(user)
    } catch (error) {
        throw (error)
    }

}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    return await httpService.post('auth/logout')
}


function saveLocalUser(user) {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}






