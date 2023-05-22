class Node {
    constructor(element, parent) {
        this.element = element;
        this.parent = parent;
        this.left = null;
        this.right = null;
    }
}
class Tree {
    constructor() {
        this.root = null;
    }
    add(element) {
        if (this.root === null) {
           return  this.root = new Node(element);
        }
        // 可以用递归，用循环就可以了
        let currentNode = this.root; // 更新当前节点
        let parent;
        let compare;
        while (currentNode) {
            compare = currentNode.element < element;
            parent = currentNode; // 遍历前先记录节点
            if (compare) { //  作比较 更新节点
                // 接着以右边的为根节点
                currentNode = currentNode.right
            } else {
                currentNode = currentNode.left // 插入8的时候 右边没有人了
            }
        }
        // compare; // 放左还是放右边
        // parent; // 放到谁的身上
        let node = new Node(element, parent)
        if (compare) {
            parent.right = node
        } else {
            parent.left = node
        }
        // 如何实现 左边和右边分开存放
        // let currentNode = this.root;
        // if(currentNode.element < element){ // 比根节点大
        //     currentNode.right = new Node(element,currentNode)
        // }else{
        //     currentNode.left = new Node(element,currentNode)
        // }
    }
}

let tree = new Tree();
[10, 8, 19, 6, 15, 22, 20].forEach(item => {
    tree.add(item);
});
console.dir(tree,{depth:1000});


// 树的遍历 和 文件夹的操作
// 网络 http相关的内容
// 周日 http中的header 应用 （写一个工具http-server）
// 在下周 koa + express源码