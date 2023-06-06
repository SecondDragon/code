class Node {
    constructor(element, parent) {
        this.element = element;
        this.parent = parent; // 标记父节点
        this.left = null; // 左树和 右树
        this.right = null;
    }
}
class Tree { // 二叉搜索树 我们没有考虑相同值的情况
    constructor() {
        this.root = null;
    }
    add(element) {
        if (this.root === null) {
           return  this.root = new Node(element);
        }
        let currentNode = this.root; 
        let parent;
        let compare;
        while (currentNode) {
            compare = currentNode.element < element;
            parent = currentNode; 
            if (compare) {
                currentNode = currentNode.right
            } else {
                currentNode = currentNode.left 
            }
        }
        let node = new Node(element, parent)
        if (compare) {
            parent.right = node
        } else {
            parent.left = node
        }
    }
    preorderTraversal(){
        function traversal(node){ // 写递归先考虑 终止条件
            if(node == null) return;
            console.log(node.element);
            traversal(node.left);
            traversal(node.right);
        }
        traversal(this.root);
    }
    postOrderTraversal(){
        function traversal(node){ // 写递归先考虑 终止条件
            if(node == null) return;
            traversal(node.left);
            traversal(node.right);
            console.log(node.element);
        }
        traversal(this.root);
    }
    levelOrderTraversal(cb){
        let stack = [this.root];
        let index = 0;
        let currentNode;
        while (currentNode = stack[index++]) {
            cb(currentNode);
            if(currentNode.left){
                stack.push(currentNode.left);
            }
            if(currentNode.right){
                stack.push(currentNode.right);
            }
        }
    }
    reverse(){
        let stack = [this.root];
        let index = 0;
        let currentNode;
        while (currentNode = stack[index++]) {
            let temp = currentNode.left;
            currentNode.left = currentNode.right;
            currentNode.right = temp;
            if(currentNode.left){
                stack.push(currentNode.left);
            }
            if(currentNode.right){
                stack.push(currentNode.right);
            }
        }
    }
}
let tree = new Tree();
[10, 8, 19, 6, 15, 22, 20].forEach(item => {
    tree.add(item);
});
// console.dir(tree,{depth:1000});

// webpack -> ast babel树的遍历， 需要在遍历的过程中将当前节点给你传递出来，你来使用
tree.reverse();
console.log(tree);
// tree.levelOrderTraversal((node)=>{
//     node.element *= 2
// });

// 实现二叉树的反转？


// 遍历树  （递归，非递归 -》 栈来优化）
//  先序 遇到节点就处理节点，在继续处理左边 ，左边树处理完后 在处理右边
//  中序 层序
//  后序

