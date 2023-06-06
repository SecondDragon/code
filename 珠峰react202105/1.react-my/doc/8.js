//React16以前
let GrandFatherContext ={a:1}
let FatherContext = {b:1}

//let ChildContext = {...GrandFatherContext,...FatherContext};
//ChildContext.a
//ChildContext.b;

//React16是可以知道 的
let ChildContext ={GrandFatherContext,FatherContext}
//ChildContext.GrandFatherContext.a;
//ChildContext.FatherContext.b;