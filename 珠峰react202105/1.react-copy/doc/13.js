function Counter(){
    let number = 0;
    function useEffect(){
        number++;
        return number;
    }
    return useEffect;
}
//每次Counter执行都会产生一个新的执行上下文对象 ，number变量就是这个上下文对象上的属性
let useEffect = Counter()
useEffect();
Counter()
Counter()
Counter()
Counter()
Counter()
useEffect();
console.log(useEffect());

/**
老师，那hooks本质不是闭包吗？ 
sens
settate，在组件内number为什么可以拿到最新的 
Traveller
但是setNumber不是改了number的值麽    number是hooks定义的  是一个全局的变量呀 
八宝粥
一个函数一个执行上下文？互不影响？ 
冰柠檬
老师，如果number是全局的不就是每次都加一了？ 
notnull
在useEffect 中的setNumber 后num 不是已经变了啊 下次渲染的时候的 effect 里面的函数不是新函数吗？ 
sens
那不在effect里面，在组件里面的number为什么可以拿到最新的呢 
abc

 */