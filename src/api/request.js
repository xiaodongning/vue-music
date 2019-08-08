import axios from 'axios'
import Qs from 'qs'
const service = axios.create({
  baseURL: process.env.BASE_API,
  headers: {
    'Content-type': 'application/x-www-form-urlencoded'
  },
  timeout: 5000
})

service.interceptors.request.use(config => {
  config.data = Qs.stringify(config.data)
  return config
}, error => {
  Promise.reject(error)
})

service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 200) {
      return Promise.reject(response)
    } else {
      return res
    }
  },
  error => {
    if (error.response.status === 401) {
      return Promise.reject(error)
    } else {
      return Promise.reject(error)
    }
  }
)
export default service
