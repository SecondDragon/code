const LinkedList = require('./2.linkList')

// 用链表 来实现队列
class Queue {
    constructor() {
        this.ll = new LinkedList
    }
    poll() { // 删除头部
        let removeNode =  this.ll.remove(0);
        return removeNode && removeNode.element;
    }
    offer(element) { // 添加
        this.ll.add(element)
    }
}
module.exports = Queue;