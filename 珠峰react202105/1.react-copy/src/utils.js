import {REACT_TEXT} from './constants';
/**
 * 不管原来是什么样的元素，都转成对象的形式，方便后续的DOM-DIFF
 * @param {*} element 
 * @returns 
 */
export function wrapToVdom(element){
   if(typeof element === 'string' || typeof element === 'number'){
      //返回的也是React元素，也是虚拟DOM
      return {type:REACT_TEXT,props:{content:element}};//虚拟DOM.props.content就是此文件的内容
   }else{
       return element;
   }
}

export function shallowEqual(obj1={},obj2={}){
   if(obj1 === obj2){
      return true;
   }
   if(typeof obj1!== 'object'||obj1===null||typeof obj2!== 'object'||obj2===null){
      return false;
   }
   let keys1 = Object.keys(obj1);
   let keys2 = Object.keys(obj2);
   if(keys1.length !== keys2.length){
      return false;
   }
   for(let key of keys1){
      if(!obj2.hasOwnProperty(key) || obj1[key]!== obj2[key]){
         return false;
      }
   }
   return true;
}