- 刚才 forwardRef 的 class 里 传 this.props.ref 给函数组件,  但 props 里有 ref 吗？ 
- render后直接调用了didMount，是怎么保证挂载后才执行到didMount的呢？ 
- 那多个 上下文怎么写呢
- 如果孙子要同时取得父亲和爷爷的 context， 该怎么写？ 

- 一起使用pruecomponent 和 context 在某些情况下会出现子组建无法更新的情况了？
- console.log(child? === Father.prototype);

super也有返回值吗 
Jack
super可以理解为父类的实例 
说滴对！
如果oldComponent比较复杂，这样改老组件，就不好写了啊 
老师，子类的所有生命周期里都得写一遍父类的生命周期吗？ 


子类写了，父类就得再写一遍？ 
Jack
父类有的就是重写而已，父类没得就是扩展 
嘎啦果
克隆得到元素和克隆前的元素引用是相同的吗 
2882
不是 

那克隆组件不能克隆有state的组件？那有状态的组件不能用高阶组件包？ 



子类的实例 指向父类的prototype , 父类的属性绑定在父类的实例上，所以子类拿不到父类的属性？  不是的

冰柠檬撤回了一条消息
说滴对！
super在不同的方法里，表现不一样 
冰柠檬
老师，用官方的react看一下？ 

