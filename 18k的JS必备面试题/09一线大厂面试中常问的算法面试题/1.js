// let ary = [12, 23, 12, 15, 25, 15, 25, 14, 16];

/*相邻项的处理方案*/
// ary.sort((a,b)=>a-b);
// ary=ary.join('@')+'@';
// let reg=/(\d+@)\1*/g,
// 	arr=[];
// ary.replace(reg,(val,group1)=>{
// 	// arr.push(Number(group1.slice(0,group1.length-1)));
// 	arr.push(parseFloat(group1));
// });
// console.log(arr);

/*拿数组中的每项向新容器中存储，如果已经存储过了，把当前项干掉*/
/*let obj={};
for(let i=0;i<ary.length;i++){
	let item=ary[i];
	if(typeof obj[item]!=='undefined'){
		ary[i]=ary[ary.length-1];
		ary.length--;
		i--;
		continue;
	}
	obj[item]=item;
}
obj=null;
console.log(ary);*/

/* SET */
// let arr = Array.from(new Set(ary));
// console.log(arr);

/*拿出当前项和后面的内容进行比较*/
/*for(let i=0;i<ary.length-1;i++){
	let item=ary[i],
		args=ary.slice(i+1);
	if(args.indexOf(item)>-1){
		//包含：我们可以把当前项干掉  
		// splice删除
		// 1. 原来数组改变，这样如果i继续++，则会产生数组塌陷
		// 2. 性能不好：当前项一旦删除，后面项索引都要变
		// ary.splice(i,1);
		// i--;

		//赋值为null，后续filter一次
		// ary[i]=null;

		//用最后一项替换
		ary[i]=ary[ary.length-1];
		ary.length--;
		i--;
	}
}
// ary=ary.filter(item=>item!==null);
console.log(ary);
*/


/*数组扁平化*/
/*let arr = [
    [1, 2, 2],
    [3, 4, 5, 5],
    [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10
];*/

/*ES6方法直接实现*/
// arr=arr.flat(Infinity);

/*转换为字符串*/
// arr=arr.toString().split(',').map(item=>parseFloat(item));
// arr=JSON.stringify(arr).replace(/(\[|\])/g,'').split(',').map(item=>parseFloat(item));

/*循环验证是否为数组*/
// while (arr.some(item => Array.isArray(item))) {
//  arr = [].concat(...arr);
// }

/*(function () {
    function myFlat() {
        let result = [],
            _this = this;
        //=>循环ARR中的每一项，把不是数组的存储到新数组中
        let fn = (arr) => {
            for (let i = 0; i < arr.length; i++) {
                let item = arr[i];
                if (Array.isArray(item)) {
                    fn(item);
                    continue;
                }
                result.push(item);
            }
        };
        fn(_this);
        return result;
    }
    Array.prototype.myFlat = myFlat;
})();
arr = arr.myFlat();*/

// console.log(arr);


/*斐波那契数列*/
/*function fibonacci(n){
	if(n<=1) return 1;
	let arr=[1,1];
	//=>即将要创建多少个
	let i=n+1-2;
    while(i>0){
    	let a=arr[arr.length-2],
    		b=arr[arr.length-1];
    	arr.push(a+b);
    	i--;
    }
    return arr[arr.length-1];
}*/

/*
function fibonacci(count) {
  function fn(count, curr = 1, next = 1) {
    if (count == 0) {
      return curr;
    } else {
      return fn(count - 1, next, curr + next);
    }
  };
  return fn(count);
}
*/


/*
 * 输入一个正数N，输出所有和为N的连续正数序列
 * 例如：输入15
 * 结果：[[1,2,3,4,5],[4,5,6],[7,8]]
 */
 function createArr(n,len){
    let arr=new Array(len).fill(null),
        temp=[];
    arr[0]=n;
    arr=arr.map((item,index)=>{
        if(item===null){
            item=temp[index-1]+1;
        }
        temp.push(item);
        return item;
    });
    return arr;
}
function fn(count){
    let result=[];
    //=>求出中间值
    let middle=Math.ceil(count/2);
    //从1开始累加
    for(let i=1;i<=middle;i++){
        //控制累加多少次
        for(let j=2;;j++){
            //求出累加多次的和
            let total=(i+(i+j-1))*(j/2);
            if(total>count){
                break;
            }else if(total===count){
                result.push(createArr(i,j));
                break;
            }
        }
    }
    return result;
}
console.log(fn(4));
console.log(fn(5));
console.log(fn(10));
console.log(fn(15));