let isBatchingUpdate = true;

let queue = [];
let state = {number:0};
function setState(newSate){
    //state={...state,...newSate}
    if(isBatchingUpdate){
        queue.push(newSate);
    }else{
        state={...state,...newSate}
    }   
}

function handleClick(){
    isBatchingUpdate=false;
    /**我们自己逻辑开始 */
    setState({number:state.number+1});
    console.log(state);
    setState({number:state.number+1});
    console.log(state);
     /**我们自己逻辑结束 */
    /*  queue.forEach(newState=>{
        state={...state,...newState}
     }) */
     /* state= queue.reduce((newState,action)=>{
        return {...newState,...action}
    },state); */
}
handleClick();
console.log(state);

