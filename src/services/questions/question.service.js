import { httpService } from '../basic/http.service.js'

const BASE_URL = (process.env.NODE_ENV === 'production')
    ? '/api/question'
    : 'http://localhost:3030/api/question/'


export const questionService = {
    query,
    getById,
    remove,
    save,

}
// added english version

async function query() {
    const questions = await httpService.get('question')
    return questions
}

async function getById(anyId) {
    return await httpService.get(`${BASE_URL}/${anyId}`)
}

async function remove(anyId) {
    // return httpService.delete(`any/${anyId}`)
}

async function save(any) {


    // if (any._id) return httpService.put(`any/${any._id}`, any)
    // else return httpService.post('any', any)
}


