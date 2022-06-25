import { httpService } from '../basic/http.service.js'
const BASE_URL = (process.env.NODE_ENV === 'production')
    ? '/api/any'
    : 'http://localhost:3030/api/any/'


export const anyService = {
    query,
    getById,
    remove,
    save,

}

async function query() {
    return httpService.get('any')
}

async function getById(anyId) {
    return await httpService.get(`any/${anyId}`)
}

async function remove(anyId) {
    return httpService.delete(`any/${anyId}`)
}

async function save(any) {
    if (any._id) return httpService.put(`any/${any._id}`, any)
    else return httpService.post('any', any)
}