"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function info(stuObj) {
    console.log("name:", stuObj.username, " age:", stuObj.age);
    return 3;
}
var stuObj = { username: "wangwu", age: 23, phone: "111" };
info(stuObj);
function subInfo(_a) {
    var username = _a.username, phone = _a.phone;
    console.log("name:", username, " phone:", phone);
    return 3;
}
subInfo({ username: "lisi", age: 33, phone: "222" });
