"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.add = exports.set = void 0;
var obj = { username: "wangwu", age: 23 };
exports.set = new Set(["abc", "df"]);
function add(one, two) {
}
exports.add = add;
var Student = (function () {
    function Student(name, phone) {
        this.name = name;
        this.phone = phone;
    }
    Student.prototype.study = function () {
        console.log(this.name + " 学习");
    };
    return Student;
}());
exports.default = Student;
