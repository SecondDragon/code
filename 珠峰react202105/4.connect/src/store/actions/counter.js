
import {push} from '../../connected-react-router';
const actions = {
    goto(path){
      debugger
      //我需要在这个地方跳转新的路径里去
      return push(path);  //返回一个action动作对象
      /**
       * {
            type:CALL_HISTORY_METHOD,
            payload:{
             method:'push'
             args:[path]
            }
          }
          history.push(path)
       */
    }
}
export default actions;