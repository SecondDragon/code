

let listeners = [];


listeners.push(()=>{
    console.log('执行');
});

listeners.forEach(l=>l());