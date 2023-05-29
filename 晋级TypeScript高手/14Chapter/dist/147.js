// 14-7  一个联合类型技巧性使用的场景 
function mounted(isStartUp) {
    if (isStartUp) {
        console.log("yes");
    }
    else {
        console.log("no");
    }
}
mounted(1);
