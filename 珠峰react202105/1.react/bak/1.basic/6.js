let obj = {name:'zhufeng',home:{name:'北京'}};
//Object.freeze(obj);//不可扩展，不可删除，不可修改
//Object.seal(obj);//不可扩展，不可删除，但是可以修改

function deepFreeze(obj){
    Object.freeze(obj);
    for(let key in obj){
        if(typeof obj[key] =='object'){
            deepFreeze(obj[key]);
        }
    }
}
deepFreeze(obj);
obj.home.name = '南京';
console.log(obj.home);