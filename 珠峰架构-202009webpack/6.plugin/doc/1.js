
let options = {
    //key是模块的名称 值是一个对象 expose 此CDN脚本向window挂的变量名 url此CDN的路径
    jquery:{
        expose:'$',
        url:'https://cdn.bootcss.com/jquery/3.1.0/jquery.js'
    },
    lodash:{
        expose:'_',
        url:'https://cdn.bootcdn.net/ajax/libs/lodash.js/0.1.0/lodash.js'
    }
}
 
 console.log(Object.values(options).map(item=>item.url));