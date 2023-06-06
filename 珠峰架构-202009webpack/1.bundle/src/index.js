
btn.addEventListener('click',()=>{
    //如果代码里出现了import方法调用,会自动进行代码分割
    import(/* webpackChunkName: "title" */ "./title").then((result) => {
    console.log(result);
    });
});
