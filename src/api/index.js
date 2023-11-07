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

/** 查询数据字典 */
export function queryDicts(data){
    const url = '/hub_dict/queryDicts'
    return request({
        method:'post',
        url:url,
        params:{...data.start,...data.limit},
        data:data
    })
}