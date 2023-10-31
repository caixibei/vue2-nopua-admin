import axios from "@/axios";

const request = axios.create({
    baseURL:'http://jsonplaceholder.typicode.com/',
    timeout:3000,
})

export default request