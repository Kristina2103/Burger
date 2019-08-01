import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'https://react-burger-f4c7e.firebaseio.com/'
})

export default axiosInstance