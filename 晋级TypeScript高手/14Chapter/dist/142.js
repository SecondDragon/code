"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function calToal(product) {
    console.log("product总价:", product.price * product.count);
    product.transfer();
}
calToal({
    id: 100, name: "电脑", price: 5000, count: 10,
    mark: "注意轻纺", place: "", quatity: "二手",
    transfer() {
        console.log(this.name, "运输");
    }
});
let getter = {
    getProductInfo(state) {
    },
    getOneProduct(state) {
    }
};
