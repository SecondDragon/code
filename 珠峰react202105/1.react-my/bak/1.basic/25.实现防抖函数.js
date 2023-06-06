function throlte(func, delay, thisArgs) {
    let timer = null
    return function () {
        if (!timer) return
        timer = setTimeout(() => {
            func.call(thisArgs, ...arguments)
            timer = null
        }, delay)
    }

}

//立即执行的debounce
function debounce(fn, delay, immediate = false, callback) {
    let timer = null
    //是否已经立即执行过
    let isInvoke = false

    const _debounce = function (...args) {
        return new Promise((resolve, reject) => {
            if (timer) clearTimeout(timer)

            if (immediate && !isInvoke) {
                const result = fn.apply(this, args)
                if (callback) callback(result)
                //特定时间内的第一次已经立即执行过了
                isInvoke = true
                resolve(result)
            } else {
                timer = setTimeout(() => {
                    const result = fn.apply(this, args)
                    if (callback) callback(result)
                    //重置
                    isInvoke = false
                    resolve(result)
                    timer = null
                }, delay)
            }
        })
    }
    _debounce.cancel = () => {
        clearTimeout(timer)
        isInvoke = false
        timer = null
    }
    return _debounce

}

function throttle(fn, delay) {
    let timer = null
    const _throttle = (...args) => {
        if (!timer) {
            fn.apply(this, args)
            timer = setTimeout(() => {
                timer = null
            }, delay)
        }

    }
    return _throttle
}
