import { httpService } from '../basic/http.service.js'
import { storageService } from '../basic/async-storage.service.js'
import questionsFromJson from '../../question.json'
const BASE_URL = (process.env.NODE_ENV === 'production')
    ? '/api/form'
    : 'http://localhost:3030/api/form/'


export const formService = {
    query,
    getById,
    remove,
    save,

}

const STORAGE_KEY = 'form'

async function query() {
    const questions = await storageService.query(STORAGE_KEY)
    if (questions?.length === 0) {
        await storageService.saveAll(STORAGE_KEY, questionsFromJson)
    }
    return await storageService.query(STORAGE_KEY)
    // return httpService.get('form')
}

async function getById(anyId) {
    return storageService.get(STORAGE_KEY, anyId)

    // return await httpService.get(`any/${anyId}`)
}

async function remove(anyId) {
    // await storageService.remove(STORAGE_KEY, anyId)
    // return httpService.delete(`any/${anyId}`)
}

async function save(form) {
    // savedCar = await storageService.put(STORAGE_KEY, any)
    // savedCar = await storageService.post(STORAGE_KEY, any)


    // if (any._id) return httpService.put(`any/${any._id}`, any)
    await httpService.post('form', form)
}


