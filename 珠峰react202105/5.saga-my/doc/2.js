


function* rootSaga() {
    //yield take(actionTypes.ASYNC_ADD);//监听ASYNC_ADD
    //yield {type:'TAKE',actionType:'ASYNC_ADD'}
    //yield put({ type: actionTypes.MINUS });//派发一个动作
    //yield {type:'PUT',action:{type:'MINUS'}}
}
//在saga中间件里核心 就是执行rootSaga
let it = rootSaga();
it.next(); //{done:false,value:{type:'TAKE',actionType:'ASYNC_ADD'}}
it.next();
