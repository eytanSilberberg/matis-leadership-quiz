import { httpService } from '../basic/http.service.js'
const BASE_URL = (process.env.NODE_ENV === 'production')
    ? '/api/form'
    : 'http://localhost:3030/api/form/'


export const formService = {
    query,
    save,

}

const STORAGE_KEY = 'form'

async function query() {
    return httpService.get(STORAGE_KEY)
}

async function save(form) {

    await httpService.post(STORAGE_KEY, form)
}


