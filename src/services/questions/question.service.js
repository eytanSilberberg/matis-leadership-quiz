import { httpService } from '../basic/http.service.js'
import { storageService } from '../basic/async-storage.service.js'
import questionsFromJson from '../../question.json'

const BASE_URL = (process.env.NODE_ENV === 'production')
    ? '/api/question'
    : 'http://localhost:3030/api/question/'


export const questionService = {
    query,
    getById,
    remove,
    save,

}

const STORAGE_KEY = 'question'

async function query() {
    const questions = await httpService.get('question')
    return questions
    // return await storageService.query(STORAGE_KEY)
}

async function getById(anyId) {
    // return storageService.get(STORAGE_KEY, anyId)

    return await httpService.get(`${BASE_URL}/${anyId}`)
}

async function remove(anyId) {
    // await storageService.remove(STORAGE_KEY, anyId)
    // return httpService.delete(`any/${anyId}`)
}

async function save(any) {
    // savedCar = await storageService.put(STORAGE_KEY, any)
    // savedCar = await storageService.post(STORAGE_KEY, any)


    // if (any._id) return httpService.put(`any/${any._id}`, any)
    // else return httpService.post('any', any)
}


