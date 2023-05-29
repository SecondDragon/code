let a = 10
function foo(b){
   let a = 2
   function baz(c){
       console.log(a+b+c)
   }
   return baz
}
let fn = foo(2)
fn(3)