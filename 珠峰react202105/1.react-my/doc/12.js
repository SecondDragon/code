let array1 = [1,2,3];
let array2 = [1,2,4];
let result = array1.every((item,i)=>item===array2[i]);

console.log('====================================');
console.log(result);
console.log('====================================');
//如果不放依赖，每次都是新的，跟你不用memo callback一样的
//如果依赖是空数组，每次都是一次