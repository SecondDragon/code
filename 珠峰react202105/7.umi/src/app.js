
/**
 * 给路由配置打补丁
 * @param {*} param0 
 */
/* export function patchRoutes({routes}){
    //添加到数组的队头
    routes.unshift({
        path:'/foo',//路径
        exact:true,
        component:require('./Foo').default
    });
} */
let extraRoutes;
//routes就是一个普通的数组 shift unshift pop push
export function modifyClientRenderOpts(memo){
    memo.routes.unshift(...extraRoutes);
    return memo;
}
//oldRender= ReactDOM.render
export function render(oldRender){
    /**
     * res=[
        {
            path:'/foo',
            component:'Foo.js'
        }
    ]
     */
    fetch('/api/routes').then(res=>res.json()).then(res=>{
        extraRoutes=res.map(item=>{
          let component=require(`./components/${item.component}`).default;
          return {...item,component}; 
        })
        oldRender();
    });
}