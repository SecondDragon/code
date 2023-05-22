function throttle(fn, delay) {
    let timer = null
    return function (...args) {
        let context = this;
        if (timer) return;

        let timer = setTimeout(() => {
            fn.apply(context, args)
            timer = null
        },delay)
    }
}