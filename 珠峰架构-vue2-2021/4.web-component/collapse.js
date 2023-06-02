class Collapse extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const tmpl = document.getElementById('collapse_tmpl');
        let cloneTemplate = tmpl.content.cloneNode(true);
        let style = document.createElement('style');
        // :host 代表的是影子的根元素
        style.textContent = `
            :host{
                display:flex;
                border:3px solid #ebebeb;
                border-radius:5px;
                width:100%;
            }
            .zf-collapse{
                width:100%;
            }
        `
        shadow.appendChild(style);
        shadow.appendChild(cloneTemplate);

        let slot = shadow.querySelector('slot'); // 监控slot变化
        slot.addEventListener('slotchange', (e) => {
            this.slotList = e.target.assignedElements();
            this.render();
        })
    }
    static get observedAttributes() { // 监控属性的变化
        return ['active']
    }
    // update
    attributeChangedCallback(key, oldVal, newVal) {
        if (key == 'active') {
            this.activeList = JSON.parse(newVal);
            this.render();
        }
    }
    render() {
        if (this.slotList && this.activeList) {
            [...this.slotList].forEach(child => {
                child.setAttribute('active', JSON.stringify(this.activeList))
            });
        }
    }
    // connectedCallback(){
    //     console.log('插入到dom时执行的回调')
    // }
    // disconnectedCallback(){
    //     console.log('移除到dom时执行的回调')
    // }
    // adoptedCallback(){
    //     console.log('将组件移动到iframe 会执行')
    // }

}
export default Collapse