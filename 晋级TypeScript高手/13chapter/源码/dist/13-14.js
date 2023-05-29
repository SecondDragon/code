"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnumAuditStatus = void 0;
var EnumAuditStatus;
(function (EnumAuditStatus) {
    EnumAuditStatus[EnumAuditStatus["MANAGER_ADUIT_FAIL"] = -1] = "MANAGER_ADUIT_FAIL";
    EnumAuditStatus[EnumAuditStatus["NO_ADUIT"] = 0] = "NO_ADUIT";
    EnumAuditStatus[EnumAuditStatus["MANAGER_ADUIT_SUCCESS"] = 1] = "MANAGER_ADUIT_SUCCESS";
    EnumAuditStatus[EnumAuditStatus["FINAL_ADUIT_SUCCESS"] = 2] = "FINAL_ADUIT_SUCCESS";
})(EnumAuditStatus = exports.EnumAuditStatus || (exports.EnumAuditStatus = {}));
var MyAduit = (function () {
    function MyAduit() {
    }
    MyAduit.prototype.getAduitStatus = function (status) {
        if (status === EnumAuditStatus.NO_ADUIT) {
            console.log("没有审核");
        }
        else if (status === EnumAuditStatus.MANAGER_ADUIT_SUCCESS) {
            console.log("经理审核通过");
        }
        else if (status === EnumAuditStatus.FINAL_ADUIT_SUCCESS) {
            console.log("财务审核通过");
        }
    };
    return MyAduit;
}());
var aduit = new MyAduit();
aduit.getAduitStatus(EnumAuditStatus.NO_ADUIT);
