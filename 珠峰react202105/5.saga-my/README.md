## saga
-  实现异步加1的操作
-   以前通过redux-saga redux-promise实现的
-   通过redux-saga


老师一般什么情况下用saga合适 

什么时候都合适
尤其是业务流程比较复杂的时候

sensFeng
如果我有很多个dispatch发送给saga，该咋写 
sensFeng
rootsaga里面 


take 这里用的时候，感觉要加个死循环 
千城
saga不是会执行完就不执行了吗 
14:54
Traveller
take完了怎么执行的next 
Traveller
再看一眼 
菜菜
断点跑一遍吧 
说滴对！
run方法调用，rootSaga里面的循环一次执行结束吗 
f



14:54
Traveller
take完了怎么执行的next 
Traveller
再看一眼 
菜菜
断点跑一遍吧 
说滴对！
run方法调用，rootSaga里面的循环一次执行结束吗 
f
next是什么 
