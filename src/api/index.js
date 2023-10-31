import request from "@/request"

/** 测试接口 */
export function testAxios(){
    const url = '/posts'
    request.get(url).then((res)=>{
        console.log(res,'res')
    })
}