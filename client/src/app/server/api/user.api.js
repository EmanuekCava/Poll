import axios from 'axios'

const api = axios.create({ baseURL: "http://localhost:7789" })

export const loginApi = (authData) => api.post('/login', authData, {
    headers: {
        'Content-Type': 'application/json'
    }
})

export const registerApi = (authData) => api.post('/register', authData, {
    headers: {
        'Content-Type': 'application/json'
    }
})
