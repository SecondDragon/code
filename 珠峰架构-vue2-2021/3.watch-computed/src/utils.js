export function isFunction(val) {
    return typeof val === 'function';
}

export function isObject(val) {
    return typeof val == 'object' && val !== null

}
const callbacks = [];

function flushCallbacks() {
    callbacks.forEach(cb => cb());
    waiting = false
}
let waiting = false;
function timer(flushCallbacks) {
    let timerFn = () => {}
    if (Promise) {
        timerFn = () => {
            Promise.resolve().then(flushCallbacks)
        }
    } else if (MutationObserver) {
        let textNode = document.createTextNode(1);
        let observe = new MutationObserver(flushCallbacks);
        observe.observe(textNode, {
            characterData: true
        })
        timerFn = () => {
            textNode.textContent = 3;
        }
        // 微任务
    } else if (setImmediate) {
        timerFn = () => {
            setImmediate(flushCallbacks)
        }
    } else {
        timerFn = () => {
            setTimeout(flushCallbacks)
        }
    }
    timerFn();
}

// 微任务是在页面渲染前执行 我取的是内存中的dom，不关心你渲染完毕没有

export function nextTick(cb) {
    callbacks.push(cb); // flushSchedulerQueue / userCallback

    if (!waiting) {
        timer(flushCallbacks); // vue2 中考虑了兼容性问题 vue3 里面不在考虑兼容性问题
        waiting = true;
    }
}