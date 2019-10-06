import axios from 'axios'

const api = axios.create({
    //Alterar o ip de acordo com o que tem no expo
    baseURL: 'http://192.168.0.7:3333'
})

export default api