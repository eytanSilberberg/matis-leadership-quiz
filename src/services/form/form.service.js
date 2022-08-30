import { httpService } from '../basic/http.service.js'
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
    return httpService.get('form')
}

async function getById(anyId) {
    // return await httpService.get(`any/${anyId}`)
}

async function remove(anyId) {
    // return httpService.delete(`any/${anyId}`)
}

async function save(form) {

    await httpService.post('form', form)
}


