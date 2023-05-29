// 14-6  一种特殊的接口类型 【加量赠送】
// 接口当名字的函数类型
let actionContext = (state, commit) => {
    console.log("state:", state);
};
actionContext("abc", "df");
