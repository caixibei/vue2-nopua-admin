import request from "@/request"

/** 查询用户信息 */
export function queryUsers(){
    const url = '/user/queryUsers'
    return request.post(url)
}