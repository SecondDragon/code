function debounce(fn, delay, immediate = false, resultCallback) {
    // resultCallback 函数返回值
    let timer = null;
    let isInvoke = false
    return function (...args) {
        let context = this;
        return new Promise((resolve, reject) => {
            if (timer) clearTimeout(timer)

            if (immediate && !isInvoke) {
                const result = fn.apply(context, args)
                if (resultCallback) resultCallback(result)
                isInvoke = true
                resolve(result)
            }

            timer = setTimeout(() => {
                const result = fn.apply(context, args)
                if (resultCallback) resultCallback(result)
                timer = null;
                isInvoke = false
                resolve(result)
            }, delay)
        })

    }
}
function debounce(fn, delay, immediate = false) {
    // 1.定义一个定时器, 保存上一次的定时器
    let timer = null
    let isInvoke = false

    // 2.真正执行的函数
    const _debounce = function (...args) {
        // 取消上一次的定时器
        if (timer) clearTimeout(timer)

        // 判断是否需要立即执行
        if (immediate && !isInvoke) {
            fn.apply(this, args)
            isInvoke = true
        } else {
            // 延迟执行
            timer = setTimeout(() => {
                // 外部传入的真正要执行的函数
                fn.apply(this, args)
                isInvoke = false
            }, delay)
        }
    }

    return _debounce
}
