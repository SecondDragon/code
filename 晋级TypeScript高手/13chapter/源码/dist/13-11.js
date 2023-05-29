"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Status = {
    MANAGER_ADUIT_FAIL: -1,
    NO_ADUIT: 0,
    MANAGER_ADUIT_SUCCESS: 1,
    FINAL_ADUIT_SUCCESS: 2
};
var MyAduit = (function () {
    function MyAduit() {
    }
    MyAduit.prototype.getAduitStatus = function (status) {
        if (status === Status.NO_ADUIT) {
            console.log("没有审核");
        }
        else if (status === Status.MANAGER_ADUIT_SUCCESS) {
            console.log("经理审核通过");
        }
        else if (status === Status.FINAL_ADUIT_SUCCESS) {
            console.log("财务审核通过");
        }
    };
    return MyAduit;
}());
var aduit = new MyAduit();
aduit.getAduitStatus(Status.NO_ADUIT);
