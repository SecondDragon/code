let dispatch;
debugger
let middlewareAPI = {
    dispatch:undefined
}
//middlewareAPI.dispatch({type:'ADD'});
dispatch = (action)=>{console.log('action',action);}

middlewareAPI.dispatch({type:'ADD'});

let a;
let b=a;
a = 1;
console.log(b); 