import {findDOM,compareTwoVdom} from './react-dom';
import {shallowEqual} from './utils';
export let updateQueue = {
  isBatchingUpdate:false,//通过此变量来控制是否批量更新
  updaters:[],
  batchUpdate(){
    for(let updater of updateQueue.updaters){
      updater.updateComponent();
    }
    updateQueue.isBatchingUpdate=false;
    updateQueue.updaters.length=0;
  }
}
class Updater{
  constructor(classInstance){
    this.classInstance = classInstance;
    this.pendingStates = [];//保存将要更新的队列
    this.callbacks = [];//保存将要执行的回调函数
  }
  addState(partialState,callback){
    this.pendingStates.push(partialState);
    if(typeof callback ==='function')
       this.callbacks.push(callback)
    this.emitUpdate();//触发更新逻辑   
  }
  //不管状态和属性的变化 都会让组件刷新，不管状态变化和属性变化 都会执行此方法
  emitUpdate(nextProps){
       this.nextProps  = nextProps;//可能会传过来了一新的属性对象
      //如果当前处于批量更新模式，那么就把此updater实例添加到updateQueue里去
       if(updateQueue.isBatchingUpdate){
         updateQueue.updaters.push(this);
       }else{
        this.updateComponent();//让组件更新
       }
  }
  updateComponent(){
     let {classInstance,pendingStates,nextProps} = this;   
     if(nextProps||pendingStates.length > 0){//如果有等待的更新的话
        shouldUpdate(classInstance,nextProps,this.getState());
     }
  }
  //根据老状态，和pendingStates这个更新队列，计算新状态
  getState(){
    let {classInstance,pendingStates} = this;  
    let {state} = classInstance;//先获取老的原始的组件状态
    pendingStates.forEach(nextState=>{
       if(typeof nextState === 'function')  {
        nextState=nextState(state);
       }  
       state = {...state,...nextState};
    });
    pendingStates.length = 0;//清空等待更新的队列
   /*  this.callbacks.forEach(callback=>callback());
    this.callbacks.length=0; */
    return state;//返回新状态
  }
}
function shouldUpdate(classInstance,nextProps,nextState){
  let willUpdate = true;//是否要更新，默认值是true
  if(classInstance.shouldComponentUpdate//有此方法
    &&(!classInstance.shouldComponentUpdate(nextProps,nextState))){//并且方法的返回值为false
      willUpdate=false;
  }
  if(willUpdate && classInstance.componentWillUpdate){
    classInstance.componentWillUpdate();
  }
  //其实不管要不要更新属性和状态都要更新为最新的
  if(nextProps) classInstance.props = nextProps;
  if(classInstance.constructor.getDerivedStateFromProps){
    let nextState = classInstance.constructor.getDerivedStateFromProps(nextProps,classInstance.state);
    if(nextState){
      classInstance.state = nextState;
    }
  }else{
    classInstance.state = nextState;//永远指向最新的状态
  }
  if(willUpdate){
    classInstance.forceUpdate();//然后调用类组件实例的updateComponent进行更新
  }
}
export class Component{
    static isReactComponent = true
    constructor(props){
        this.props = props;
        this.state = {};
        //每一个类组件的实例有一个updater更新器
        this.updater = new Updater(this);
    }
    setState(partialState,callback){
        this.updater.addState(partialState,callback);
    }
    /**
     * 组件是更新
     * 1.获取 老的虚拟DOM React元素
     * 2.根据最新的属生和状态计算新的虚拟DOM
     * 然后进行比较，查找差异，然后把这些差异同步到真实DOM上
     */
    forceUpdate(){
        let oldRenderVdom = this.oldRenderVdom;//老的虚拟DOM
        //根据老的虚拟DOM查到老的真实DOM
        let oldDOM = findDOM(oldRenderVdom);
        if(this.constructor.contextType){
          this.context = this.constructor.contextType._currentValue;
        }
        let newRenderVdom = this.render();//计算新的虚拟DOM
        let extraArgs;
        if(this.getSnapshotBeforeUpdate){
          extraArgs = this.getSnapshotBeforeUpdate();
        }
        compareTwoVdom(oldDOM.parentNode,oldRenderVdom,newRenderVdom);//比较差异，把更新同步到真实DOM上
        this.oldRenderVdom=newRenderVdom;
        if(this.componentDidUpdate){
          this.componentDidUpdate(this.props,this.state,extraArgs);
        } 
    }
}

export class PureComponent extends Component{
  shouldComponentUpdate(nextProps,nextState){
    return !shallowEqual(this.props,nextProps) || !shallowEqual(this.state,nextState)
  }
}

//Component.prototype.isReactComponent = {};