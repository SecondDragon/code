// 异步的方法  
// fs.mkdirSync fs.mkdir 目录创建是要一层一层的创建
// fs.stat 可以用于描述文件的状态，如果不存在文件，就发生错误
// fs.existsSync 只有同步的异步被废弃了

// a a/b a/b/c a/b/c/d

// 异步递归创造目录 
/*
const fs = require('fs');
function mkdir(pathStr, cb) {
    let pathList = pathStr.split('/'); // [a,b,c,d]
    let index = 1;
    function make(err) { // co模型
        if (err) return cb(err);
        if (index === pathList.length + 1) return cb();
        let currentPath = pathList.slice(0, index++).join('/') // [a]  [a,b]
        fs.stat(currentPath,function (err) {
            if(err){
                fs.mkdir(currentPath, make)
            }else{
                make();
            }
        })
    }
    make();
}
mkdir('a/b/c/d', function(err) {
    if (err) return console.log(err)
    console.log('创建成功')
});
*/
/*
const fs = require('fs').promises; // node.11后可以直接.promises
const {existsSync,exists} = require('fs')
async function mkdir(pathStr) {
    let pathList = pathStr.split('/');
    for (let i = 1; i <= pathList.length; i++) {
        let currentPath = pathList.slice(0, i).join('/');
        if(!existsSync(currentPath)){
            await fs.mkdir(currentPath)
        }
    }
}
mkdir('a/b/c/d').then(() => {
    console.log('创造成功')
}).catch(err => {
    console.log(err)
})
*/
// 删除目录
// fs.rmdir fs.rmdirSync
// fs.readdir 查看目录中的儿子列表，数组
// fs.stat 文件状态，文件的信息 修改时间、创建时间、目录状态 (isFile isDirectory)
// fs.unlink 删除文件 （fs.rename）


// 先序遍历 ，遇到节点就处理左边的

// 串行
/*
const fs = require('fs');
const path = require('path');
function rmdir(dir,cb){ // 写递归 不要思考多层，先把父子写明白
    fs.stat(dir,function (err,statObj) {
        if(statObj.isDirectory()){
            fs.readdir(dir,function (err,dirs) { // dirs=>[a.js,b]
               dirs =  dirs.map(item=>path.join(dir,item)); // [a/a.js,a/b]
               // 把目录里面的拿出来 1个删除完毕后删除第二个
               let index = 0;
               function step() {
                   // 将儿子都删除完毕后删除自己即可
                   if(index === dirs.length) return fs.rmdir(dir,cb);
                   // 删除第一个成功后继续调用step继续删除，直到全部删除完毕后 删除自己
                   rmdir(dirs[index++],step)
               }
               step();
            })
        }else{
            // 如果是文件直接删除即可
            fs.unlink(dir,cb)
        }
    })
}
*/

// 并发
/*
function rmdir(dir, cb) {
    fs.stat(dir, function(err, statObj) {
        if (statObj.isDirectory()) {
            fs.readdir(dir, function(err, dirs) {
                dirs = dirs.map(item => path.join(dir, item));
                if (!dirs.length) {
                    return fs.rmdir(dir, cb)
                }
                let i = 0;
                function done() {
                    if (++i == dirs.length) {
                        return fs.rmdir(dir, cb)
                    }
                }
                for (let i = 0; i < dirs.length; i++) {
                    rmdir(dirs[i], done);
                }
            })
        } else {
            // 如果是文件直接删除即可
            fs.unlink(dir, cb)
        }
    })
}
*/
/*
const fs = require('fs').promises;
const path = require('path');
async function rmdir(dir) { // 如果用了async await 你就按照同步的逻辑来写就可以了
    let statObj = await fs.stat(dir);
    if (statObj.isDirectory()) {
        let dirs = await fs.readdir(dir);
        await Promise.all(dirs.map(item => rmdir(path.join(dir, item))))
        await fs.rmdir(dir);
    } else {
        return fs.unlink(dir)
    }
}
rmdir('a').then(() => {
    console.log(data)
    console.log('删除成功')
});
*/
// 这东西写成 async + await 非常容易了


// 串行广度遍历
const fs = require('fs').promises;
const path = require('path');
async function rmdir(dir) {
    let stack = [dir]; // 先把根放入
    let index = 0; // 指针
    let currentNode; // 不停的移动指针
    while (currentNode = stack[index++]) {
        let statObj = await fs.stat(currentNode); // 看下指针指到的文件
        if (statObj.isDirectory()) { // 如果是目录，将子节点存放到栈中
            let dirs = await fs.readdir(currentNode); // 读取目录是包含文件的
            dirs = dirs.map(item => path.join(currentNode, item));
            stack = [...stack, ...dirs];
        }
    }
    // let len = stack.length  倒叙删除即可
    // while () {
        
    // }
}
rmdir('a').then(() => {
    console.log('删除成功')
})