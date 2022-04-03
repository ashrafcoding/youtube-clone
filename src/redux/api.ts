import axios from 'axios'

const request = axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3/',
    params: {
        key: process.env.REACT_APP_YOUTUBE_API_KEY3
    }
})
export default request
 