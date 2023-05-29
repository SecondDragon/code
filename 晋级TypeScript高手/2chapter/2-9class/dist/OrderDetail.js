"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 订单详情类
class OrderDetail {
    constructor(orderDetailId_, productname_, count_, price_) {
        this.orderDetailId = orderDetailId_;
        this.productname = productname_;
        this.price = price_;
        this.count = count_;
    }
    getTotal() {
        return this.price * this.count;
    }
}
exports.default = OrderDetail;
let orderDetail = new OrderDetail(12, "cc", 30, 2);
console.log(orderDetail.getTotal()); //NaN
console.log(typeof orderDetail.price); //undefined
