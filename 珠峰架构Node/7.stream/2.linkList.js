/**
 * element 存储的是数据
 * next 存储的是下一个人的指针
 */

class Node {
    constructor(element, next) {
        this.element = element;
        this.next = next;
    }
}
// 存储数据 add 添加 remove 删除  set(设置) get(获取)
class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }
    _node(index) {
        let current = this.head;
        for (let i = 0; i < index; i++) { //遍历机会
            current = current.next;
        }
        return current;
    }
    add(index, element) { // 这里可以考虑越界条件
        // 1.添加的时候创造一个添加的节点，让这个节点的next指向前一个人的next
        // 2.让前一个人的next指向他自己
        if (arguments.length === 1) { // 都处理成两个参数
            element = index; // 如果只有一个参数，那么传入的是一个内容，那我把内容给element，索引处理成 当前的size
            index = this.size;
        }
        let head = this.head; // 把当前的头拿出来
        // 判断当前 节点是不是第一个，如果是第一个他就是头
        if (index == 0) {
            this.head = new Node(element, head);
        } else {
            // 获取前一个节点
            let prevNode = this._node(index - 1); // 以第二个节点为例 需要找到第一个节点
            // if(!prevNode) return
            prevNode.next = new Node(element, prevNode.next)
        }
        this.size++;
    }
    remove(index) {
        // 链表的删除如何实现 ？ 找到删除的前一个，让她的下一个指向，下一个的下一个
        // 如果删除的是头部？
        let removeNode;
        if (index == 0) {
            removeNode = this.head;
            if (removeNode !== null) {
                this.head = this.head.next;
                this.size--;
            }
        } else {
            let prevNode = this._node(index - 1);
            removeNode = prevNode.next;
            prevNode.next = prevNode.next.next;
            this.size--;
        }

        return removeNode
    }

    reverse1() { // 递归变成循环
        function r(head) {
            if (head == null || head.next == null) { // 1。空链表 2.只有一个人，就不用转了
                return head;
            }
            let newHead = r(head.next); // 先从最底层进行反转，所以这里一直往下找，找到最后一个
            head.next.next = head;
            head.next = null;
            return newHead;
        }
        this.head = r(this.head); // 补充了一句 改了头
        return this.head;
        // let head = this.head; // 获取原来的头
        // let newHead = head.next; // 用2 作为新头
        // head.next.next = head; // 将原来的下一个指向为第一个
        // head.next = null // 把老头的next 作为null
        // return newHead //返回新头
    }
    reverse() {
        let head = this.head;
        if (head == null || head.next == null) return head;
        let newHead = null; // 创建了一个空链表，将以前的链表拷贝过来了
        while (head !== null) { // 如果不是null 我就一直搬家
            let temp = head.next; // 保留2
            head.next = newHead // 让1 变为null
            newHead = head; // 让这个新链表的头 等于老链表的头
            head = temp; // 把老的指向2
        }
        this.head = newHead;
        return newHead
    }
}
module.exports = LinkedList
// let ll = new LinkedList();
// ll.add(1);
// ll.add(2);
// ll.add(3);
// ll.add(4);
// console.dir(ll.reverse(),{depth:100});

// 链表的反转如何实现

// 可写流

// 下周 “http“  koa express -》 mongo + redis -》 进程相关