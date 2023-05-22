import regObj, { verifyFn } from './reg-list/index'

//verify params type
const isObject = function (obj) {
    return obj !== null && Object.prototype.toString.call(obj) === '[object Object]';
}
const isFun = function (fn) {
    return typeof fn == 'function' && !fn.then
}
const isString = function (val) {
    return typeof val == 'string'
}

// config default options
let defaultOtions = {
    triggEvent: 'input',
    completed: () => { },
    errorClass: '',
    reg: null,
    errorMsg: '',
}
//Forms event
const INPUT_EVENT = ['change', 'input', 'blur', 'focus', 'click', 'keyup', 'keydown', 'select'];
const FORN_ITEM = ['input', 'textarea', 'select']

export const valid = {
    bind: (el, { value, modifiers }) => {
        debugger
        const ele = el.tagName === 'INPUT' ? el : el.querySelector('input')
        console.log("ele:", ele);
        if (FORN_ITEM.indexOf(ele.nodeName.toLocaleLowerCase()) == -1) {
            console.warn("The element of " + ele.nodeName + " doesn't  use this directive");
            return
        }
        // take up setting modifiers ,only the first modifiers can be used
        let triggerEvent = (Object.keys(modifiers)[0] || defaultOtions['triggEvent']).toLocaleLowerCase();
        let completedFn, errorClass, errorMsg, regType, reg;

        if (isObject(value)) {
            //default verify completed fn
            completedFn = isFun(value.completed) ? value.completed : defaultOtions['completed']
            errorClass = isString(value.errorClass) ? value.errorClass : ''
            errorMsg = isString(value.errorMsg) ? value.errorMsg : ''

            //Determining the params of value , if it's an object, assignment the value
            regType = isString(value.type) ? value.type : ''

            //get regExp  
            reg = value.reg ? new RegExp(value.reg) : regObj[regType];
        } else {
            regType = value;
            reg = regObj[regType]
        }

        //if the value of triggerEvent is the  event  of form ,to add event listener
        if (INPUT_EVENT.indexOf(triggerEvent) != -1) {

            ele.addEventListener(triggerEvent, function (ev) {
                console.log("ele:", ele);
                debugger
                if (triggerEvent == 'input') {
                    //Replace blank space 
                    ev.target.value = ev.target.value.replace(/\s+/g, '');
                    //Limitting the value of input fields
                    ev.target.value = ev.target.value.replace(reg, '');
                } else {
                    completedFn && completedFn(verifyFn(reg, ev.target.value), ev.target.value, errorMsg)
                }
                //if el has errorCalss to showMsg 
                if (errorClass) {
                    var errorEl = document.querySelector(errorClass);
                    errorEl.innerHTML = errorMsg;
                }
            })
        }
    },
    unbind: () => {

    }
}
//The necessary function
const install = function (Vue, options = { triggEvent: 'input' }) {
    defaultOtions['triggEvent'] = options.triggEvent;
    Vue.directive('valid', valid)
}

export default {
    install
}