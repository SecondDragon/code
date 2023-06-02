import History from './base'
export default class HTML5History extends History{
    constructor(router){
        super(router);
    }
    getCurrentLocation(){
        return window.location.pathname;// 获取路径
    }
    setUpListener(){
        window.addEventListener('popstate',()=>{ // 监听前进和后退
            this.transitionTo(window.location.pathname);
        })
    }
    pushState(location){
        history.pushState({},null,location);
    }
}