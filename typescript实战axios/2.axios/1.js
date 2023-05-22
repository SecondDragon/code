let p1 = new Promise(function () {

});
p2 = p1.then();
let p3 = p2.then();
console.log(p1 === p2);
console.log(p2 === p3);
