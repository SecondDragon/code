function myInstanceOf(left: Object, right: Function) {
    let proto = Object.getPrototypeOf(left)

    let rightProtoType = right.prototype

    while (true) {
        if (!proto) return false;
        if (proto===rightProtoType) return true;

        proto = Object.getPrototypeOf(proto)
    }
}
console.log('ddddddddddd',myInstanceOf([],Array));
