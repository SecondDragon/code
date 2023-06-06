function add(a,b){
 return a+b;
}

const minis = (a,b)=>a-b;

let multiply = new Function("a,b","return a*b");
console.log(multiply(3,5));
