
// 一、利用 ES6 Set 去重（ES6 中最常用）
function uniqueArray(array) {
    return Array.from(new Set(array))
}
// var arr = [1, 1, 'true', 'true', true, true, 15, 15, false, false, undefined, undefined, null, null, NaN, NaN, 'NaN', 0, 0, 'a', 'a', {}, {}];
// console.log(unique(arr))
//  //[1, "true", true, 15, false, undefined, null, NaN, "NaN", 0, "a", {}, {}]



function uniqueArray2(array) {
    let newArr=[]

    array.forEach(element => {
        if (newArr.indexOf(element) == -1) { 
            newArr.push(element)
        }
    });

    return newArr
}

function uniqueArray3(array) { 
    // return array.reduce((prev, cur) => prev.includes(cur) ? prev : [...prev, cur], []);
    let newArr = array.reduce((prev, cur) =>  
        prev.includes(cur) ? prev : [...prev,cur]
    ,[])
    return newArr
}

var arr = [1, 1, 'true', 'true', true, true, 15, 15, false, false, undefined, undefined, null, null, NaN, NaN, 'NaN', 0, 0, 'a', 'a', {}, {}];

let newArr = uniqueArray2(arr)
console.log("newArr", newArr);
let newArr2 = uniqueArray(arr)
console.log("newArr2", newArr2);
let newArr3 = uniqueArray3(arr)
console.log("newArr3", newArr3);

