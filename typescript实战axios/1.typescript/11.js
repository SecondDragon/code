"use strict";
function swap(a, b) {
}
var x;
(function (x) {
    var log;
    function log1(a) {
        console.log(a);
    }
    log = log1;
    log1(true);
    //arguments of type 'true' is not assignable to parameter of type 'string | number'.ts(2345)
    log(1);
})(x || (x = {}));
var Sum;
function FakeSum(a, b) {
    return a;
}
FakeSum.getType = function () {
    console.log('Sum getType');
};
Sum = FakeSum;
var s2 = 'xx';
