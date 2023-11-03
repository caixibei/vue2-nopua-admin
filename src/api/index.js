import request from "@/request"

/** 查询用户信息 */
export function queryUsers(data){
    const url = '/hub_user/queryUsers'
    return request({
        method:'post',
        url:url,
        params:{...data.start,...data.limit},
        data:data
    })
}