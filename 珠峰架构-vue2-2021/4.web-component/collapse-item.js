class CollapseItem extends HTMLElement {
    constructor() {
        super();
        let shadow = this.attachShadow({ mode: 'open' });
        let tmpl = document.getElementById('collapse_item_tmpl');
        let cloneTemplate = tmpl.content.cloneNode(true);
        let style = document.createElement('style');
        this.isShow = true; // 标识自己是否需要显示

        style.textContent = `
            :host{
                width:100%;
            }
            .title{
                background:#f1f1f1;
                line-height:35px;
                height:35px;
            }
            .content{
                font-size:14px;
            }
        `

        shadow.appendChild(style)
        shadow.appendChild(cloneTemplate);
        this.titleEle = shadow.querySelector('.title');

        this.titleEle.addEventListener('click',()=>{
            // 如果将结果传递给父亲  组件通信？
            document.querySelector('zf-collapse').dispatchEvent(new CustomEvent('changeName',{
                detail:{
                    name:this.getAttribute('name'),
                    isShow:this.isShow
                }
            }))
        })
    }

    static get observedAttributes() { // 监控属性的变化
        return ['active', 'title', 'name']
    }
    // update
    attributeChangedCallback(key, oldVal, newVal) {
        switch (key) {
            case 'active':
                this.activeList = JSON.parse(newVal); // 子组件接受父组件的数据
                break;
            case 'title':
                this.titleEle.innerHTML = newVal; // 接受到title属性 作为dom的title
                break;
            case 'name':
                this.name = newVal
                break;
        }
        let name = this.name;
        if (this.activeList && name) {
            this.isShow = this.activeList.includes(name);
            this.shadowRoot.querySelector('.content').style.display =  this.isShow ? 'block' : 'none'
        }
    }
}
export default CollapseItem