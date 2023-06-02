import _ from 'lodash'
const VueLazyLoad = {
    install(Vue, options) {
        const LazyClass = lazy(Vue);
        let instance = new LazyClass(options)
        Vue.directive('lazy', {
            // 所有的指令调用的都是add方法
            bind: instance.add.bind(instance),
            unbind: instance.remove.bind(instance)
        })
    }
}
const scrollParent = (el) => {
    let parent = el.parentNode;
    while (parent) {
        if (/scroll/.test(getComputedStyle(parent)['overflow'])) {
            return parent;
        }
        parent = parent.parentNode
    }
    return parent;
}
const render = (listener, status) => {
    let el = listener.el;
    let src = ''
    switch (status) {
        case 'loading':
            src = listener.options.loading;
            break;
        case 'loaded':
            src = listener.src;
            break;
        case 'error':
            src = listener.options.error
            break;
        default:
            break;
    }
    el.setAttribute('src',src);
}
const loadImg = (src,resolve,reject) => {
    let img = new Image();
    img.src = src;
    img.onload = resolve;
    img.onerror = reject;
}
const lazy = (Vue) => {
    class ReactiveListener {
        constructor({ el, src, options }) {
            this.el = el;
            this.src = src;
            this.state = { loading: false }
            this.options = options
        }
        checkInView() { // 用来检测自己在不在可视区域内
            // 获取当前元素 距离屏幕的位置 
            let { top } = this.el.getBoundingClientRect();

            return top < window.innerHeight * this.options.preload
        }
        load() { // 用来加载真实的图片路径
            // 先显示loading图片 
            // 在去加载真实图片 ， 图片成功后显示成功内容，失败显示失败的内容
            render(this, 'loading');
            loadImg(this.src, () => { // new Img.src onload
                this.state.loading = true;
                render(this, 'loaded');
            }, () => {
                this.state.loading = true;
                render(this,'error');
            });
        }
    }
    return class LazyClass {
        constructor(options) {
            this.options = options;
            this.bindHandler = false;
            this.listeners = [];
        }
        add(el, bindings) {
            Vue.nextTick(() => {
                let ele = scrollParent(el);
                // 1.监控el 是否需要显示 
                let listener = new ReactiveListener({
                    el,
                    src: bindings.value,
                    options:this.options
                });
                this.listeners.push(listener);

                if (!this.bindHandler) {
                    // intersectionObserver
                    // 降低频率用节流 防抖就是最终只触发一次
                    // 2.绑定滚动事件
                    let lazyHandler = _.throttle(this.lazyLoadHandler.bind(this), 500);
                    ele.addEventListener('scroll', lazyHandler, {
                        passive: true
                    });
                    this.bindHandler = true;
                }
                this.lazyLoadHandler(); //初始化 当前需要展示的
            })
        }
        lazyLoadHandler() {
            // 看一下 哪些需要加载
            // 在可视区域内 ， 这个元素没有被加载过
            this.listeners.forEach(listener => {
                if (listener.state.loading) return;
                // 如果自己在可视区域内 ，就调用自己的加载方法即可
                listener.checkInView() && listener.load();
            })
        }
        remove() {}
    }
}
export default VueLazyLoad;