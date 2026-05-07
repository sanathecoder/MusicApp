import axios  from 'axios'

const API = axios.create({
    baseURL: "http://musicapp1.up.railway.app/api",
    withCredentials: true
})

export default API;