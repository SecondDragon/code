

export function loadMore(element:HTMLElement,callback:Function){
   function _loadMore(){
      let clientHeight = element.clientHeight;//容器的高度
      let scrollTop = element.scrollTop;//向上卷去的高度
      let scrollHeight = element.scrollHeight;//内容高度
      if(clientHeight+scrollTop+10>=scrollHeight){
        callback();
      }
   }
   element.addEventListener('scroll',debounce(_loadMore,300));
}   
/**
 * 防抖
 */
export function debounce(fn:Function,wait:number){
   let timeout:any = null;
   return function(){
      if(timeout !== null) clearTimeout(timeout);
      timeout = setTimeout(fn,wait);
   }
}
/**
 * 下拉刷新
 * @param element 元素
 * @param callback 回调
 */
export function downRefresh(element:HTMLElement,callback:Function){
   let startY:number;//开始的时候的纵坐标
   let distance:number;//本次下拉的距离
   let originalTop = element.offsetTop;//刚开始的时候，元素距离顶部的距离
   let startTop:number;
   element.addEventListener('touchstart',function(event:TouchEvent){
      let touchMove = throttle(_touchMove,30);//从默认的10ms改为30ms
      if(element.scrollTop <= 0){//只有当没有滚动的时候才会走这个逻辑
         startTop = element.offsetTop;//刚开始的时候的offsetTop
         startY = event.touches[0].pageY;//当前点击的纵坐标
         element.addEventListener('touchmove',touchMove);
         element.addEventListener('touchend',touchEnd);
      }
      function _touchMove(event:TouchEvent){
         let pageY = event.touches[0].pageY;//实时获取 最新的纵坐标
         if(pageY > startY){//下拉
            distance = pageY - startY;//当前移动的距离
            element.style.top = startTop + distance +'px';//startTop=50px+移动 的距离
         }else{
            element.removeEventListener('touchmove',touchMove);
            element.removeEventListener('touchend',touchEnd);
         }
      }
      function touchEnd(event:TouchEvent){
          element.removeEventListener('touchmove',touchMove);
          element.removeEventListener('touchend',touchEnd);
          if(distance > 30){//如果下拉的长度大于30PX。那么就刷新课程列表
            callback();
          }
          function _back(){
            let currentTop = element.offsetTop;
            if(currentTop - originalTop >=1){
               element.style.top = currentTop-1 +'px';
               requestAnimationFrame(_back);//这个已经最流畅的
            }else{
               element.style.top = originalTop +'px';// ease in
            }
          }
          requestAnimationFrame(_back);
      }
   });
}
// delay=1000ms
export function throttle(func:Function,delay:number){
   let prev = Date.now();//prev  = 1000
   return function(){
      let context = this;
      let args = arguments;
      let now = Date.now();//200 400 600 800 1000 1200 1400 1600 1800 2000
      if(now - prev >= delay){
         func.apply(context,args);
         prev = Date.now();
      }
   }
}