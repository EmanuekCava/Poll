import axios from 'axios'

const api = axios.create({ baseURL: "http://localhost:7789" })

export const allPollsApi = () => api.get("/allpolls")

export const myPollsApi = (token) => api.get('/polls', {
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export const getPollApi = (id, token) => api.get(`/polls/${id}`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export const createPollApi = (pollData, token) => api.post('/createpoll', pollData, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export const removePollApi = (id, token) => api.delete(`/removepoll/${id}`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export const chooseOptionOneApi = (pollData, id, token) => api.patch(`/chooseoptionone/${id}`, pollData, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})