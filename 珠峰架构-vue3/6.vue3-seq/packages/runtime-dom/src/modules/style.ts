export const patchStyle = (el,prev,next) =>{ // cssText;
    const style = el.style; //获取样式 
    if(next == null){
        el.removeAttribute('style') // {style:{}}  {}
    }else{
        // 老的里新的有没有 
        if(prev){  // {style:{color}} => {style:{background}}
            for(let key in prev){
                if(next[key] == null){ // 老的里有 新的里没有 需要删除
                    style[key] = '';
                }
            }
        }
        // 新的里面需要赋值到style上
        for(let key in next){ // {style:{color}} => {style:{background}}
            style[key] = next[key];
        }
    }

}