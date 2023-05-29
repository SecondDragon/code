// 初步理解Vuex源码片段【	 4 Vuex 中 Store 类代码片段实现】，后面我们会手写源码
// 热身准备 [分解讲解]:
//   1. 对象类型中的属性key的类型为函数类型
//   2. class类中的实例属性的类型为函数类型
//   3. Vuex 底层源码中的 Store 类源码片段中的语法理解
//   4. Vuex底层源码中的 StoreOptions 接口中的 actions 属性语法理解【ActionTree】
//   5. 把 StoreOptions 接口作为 Store 构造函数的参数 
//   6. createStore方法的实现

//   2. class类中的实例属性的类型为函数类型
type funcType2 = (one: CustObjType, two: string) => void
type CustObjType = { custname: string, degree: number, commit: Commit }
type Commit = (type: string, payload?: any) => void;
class Store<S>{// 和CustObjType形成一个对比 
  state!: S
  commit!: Commit

}
// 以对象的形式来实例化一个类,和new Store效果一样，new Store获取也是一个对象
let store: Store<string> = {
  state: "wangwu",
  commit: function (type: string, payload: any) {
    console.log(type, "：", payload)//funcone2=>searchhistoryfood ： { id: 100, food: '宫保鸡丁' }
  }
}
//let store2=new Store()
let { state: mystate, commit: mycommit }: Store<string> = {
  state: "wangwu",
  commit: function (type: string, payload: any) {
    console.log(type, "：", payload)
  }
}
let { commit }: Store<string> = {
  state: "wangwu",
  commit: function (type: string, payload: any) {
    console.log(type, "：", payload)
  }
}
function funcone2({ commit }: Store<string>, two: string) {
  // 执行 S100这个函数
  commit("funcone2=>searchhistoryfood", { id: 100, food: "宫保鸡丁" })
}
funcone2(store, "abc")




export { }