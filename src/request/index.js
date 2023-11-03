import axios from "@/axios";

const request = axios.create({
    baseURL:'https://www.fastmock.site/mock/c35ce9dea65e1805d88d5d77808af252/api',
    timeout:3000,
})

export default request