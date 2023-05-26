// 可以考虑用接口来实现 接口可以和接口合并

declare global{ // 在全局下声明模块
    interface String{
        double():string
    }
}

String.prototype.double = function () {
    return 'acbc'
}


export {}