const path = require('path');
const fs = require('fs').promises;
const mime = require('mime')

// 1.中间件的作用 可以扩展属性和方法
// 2.还可以做权限处理，如果有权限 做一件事 没权限 做其他事 鉴权
// 3.可以决定是否向下执行

function static(dirname) {
    return async (ctx, next) => {
        let filePath = path.join(dirname, ctx.path);
        // 如果文件路径 不是文件的话 就不能处理了，需要调用下一个中间件，如果自己能处理。就不需要向下执行了
        try {
            const statObj = await fs.stat(filePath);
            if (statObj.isDirectory()) {
                filePath = path.join(filePath, 'index.html')
            } 
            ctx.set('Content-Type',mime.getType(filePath)+';charset=utf-8')
            ctx.body = await fs.readFile(filePath)
        } catch {
            await next(); // 自己处理不了 向下执行
        }
    }
}
module.exports = static;