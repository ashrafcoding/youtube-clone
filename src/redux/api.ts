import axios from 'axios'

const request = axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3/',
    params: {
        // key: process.env.REACT_APP_YOUTUBE_API_KEY1
        key:"AIzaSyBcRw2qqx_uVDXAwiWtXVL-lR7wetMhsg8"
    }
})
export default request
 