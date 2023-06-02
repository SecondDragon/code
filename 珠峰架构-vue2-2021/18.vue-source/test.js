const templateCompiler = require('vue-template-compiler');
// let r = templateCompiler.compile(`
// <div>
//     <slot name="title"></slot>
//     <slot name="content"></slot>
// </div>`);
// // with(this){return _c('div',[_t("title"),_v(" "),_t("content")],2)}
// console.log(r.render)


// let r1 = templateCompiler.compile(`
// <my>
//     <h1 slot="title">标题</h1>
//     <div slot="content">内容</div>
// </my>`)
// /**
// with(this){ 
//     return _c('my',[
//         _c('h1',{attrs:{"slot":"title"},slot:"title"},[_v("标题")]),_v(" "),
//         _c('div',{attrs:{"slot":"content"},slot:"content"},[_v("内容")])
//     ])
// }
// **/
// console.log(r1.render)




let r3 = templateCompiler.compile(`
<div>
    <slot :article="{title:'标题',content:'内容'}"></slot>
</div>`);
// with(this){return _c('div',[_t("default",null,{"article":{title:'标题',content:'内容'}})],2)}
console.log(r3.render)

let r4 = templateCompiler.compile(`
<my>
    <template slot-scope="{article}">
        <h1 slot="article.title">标题</h1>
        <div slot="article.content">内容</div>
    </template>
</my>`)
/**
with(this){return _c('my',
    {scopedSlots:_u([
        {key:"default",fn:function({article}){
                return [
                    _c('h1',{attrs:{"slot":"article.title"},slot:"article.title"},[_v("标题")]),
                    _v(" "),
                    _c('div',{attrs:{"slot":"article.content"},slot:"article.content"},[_v("内容")])
                ]
            }
        }
    ])
})}
 */
console.log(r4.render)



// let r5 = templateCompiler.compile(`
//     <my :value.sync="xxxx"></my>
// `);

// // with(this){return _c('my',{attrs:{"value":xxxx},on:{"update:value":function($event){xxxx=$event}}})}
// console.log(r5.render)


// // 在普通元素上 v-model 会生成指令  + value 和 input   checked + change
// // 组件  model:{value,callback}

// // 指令什么时候被调用的

// let r6 = templateCompiler.compile(`
// <my v-model="xxx"></my>
// `); // value + input  默认编译出来的是value，callback
// console.log(r6.render)