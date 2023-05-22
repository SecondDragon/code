如果add中有多个yield语句，要都执行完，才能向下吗


runSaga 递归的话， 如果 rootSaga 是无限循环， 会不会导致栈溢出？
有可能


子saga遇到take，是存放到同一个listeners中吗 



store.dispatch是不是也调用next了 ???????

说滴对！
那这样的话，takeevery，while里面，take后面直接跟put不行吗 

那这样的话  promise失败的话是不是也走error 