
export const LOCATION_CHANGE = '@@router/LOCATION_CHANGE';
export const onLocationChange = (location,action)=>(
    {
        type:LOCATION_CHANGE,
        payload:{
            location,
            action
        }
    }
)



export const CALL_HISTORY_METHOD = '@@router/CALL_HISTORY_METHOD';
//方法核心就是生成一个action对象，type
const updateLocation = (method)=>{
    return (...args)=>({
        type:CALL_HISTORY_METHOD,
        payload:{//要携带的数据
            method,
            args
        }
    })
}
//这些方法全部来自于history对象上的方法
export const push = updateLocation('push');
export const replace = updateLocation('replace');
export const go = updateLocation('go');
export const goBack = updateLocation('goBack');
export const goForward = updateLocation('goForward');