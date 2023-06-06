let queue = [];
queue.push((state)=>({number:state.number+1}));
queue.push((state)=>({number:state.number+1}));
let state = {number:0};
let result = queue.reduce((newState,action)=>{
    return action(newState);
},state);
console.log(result);