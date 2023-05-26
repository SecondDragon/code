// 这个里面针对的是属性操作，一系列的属性操作

import { patchAttr } from "./modules/attr";
import { patchClass } from "./modules/class";
import { patchEvent } from "./modules/events";
import { patchStyle } from "./modules/style";


export const patchProp = (el,key,prevValue,nextValue) => {
    switch (key) {
        case 'class':
            patchClass(el,nextValue); // 比对属性
            break;
        case 'style': // {style:{color:'red'}}  {style:{background:'red'}}
            patchStyle(el,prevValue,nextValue);
            break;
        default:
            // 如果不是事件 才是属性
            if(/^on[^a-z]/.test(key)){
                patchEvent(el,key,nextValue); // 事件就是添加和删除 修改
            }else{
                patchAttr(el,key,nextValue);
            }

            break;
    }
}
