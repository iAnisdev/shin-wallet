import axios from 'axios'

export default ()=>{
    return axios.create({
        baseURL: 'https://test2.freshchefs.cn'
    })
}