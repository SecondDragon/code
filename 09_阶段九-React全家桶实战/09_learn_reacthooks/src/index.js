import React from 'react';
import ReactDOM from 'react-dom/client';
// import { UserContext, ThemeContext } from "./05_useContext的使用/context"
import { UserContext, TokenContext } from "./12_自定义Hooks/context"
import { Provider } from "react-redux"
import store from './13_redux中的hooks/store';

// import App from './01_不使用Hook/App';
// import App from "./02_计时器实现对比/App"
// import App from "./03_useState的使用/App"

// import App from "./04_useEffect的使用/05_执行时机-控制回调执行"
// import App from "./05_useContext的使用/App"
// import App from "./06_useReducer的使用(了解)/App"
// import App from "./07_useCallback的使用/App"
// import App from "./08_useMemo的使用/App"
// import App from "./09_useRef的使用/02_useRef绑定值-解决闭包陷阱"
// import App from "./10_useImperativeHandle/App"
// import App from "./11_useLayoutEffect使用/03_切换数字-useLayoutEffect"
// import App from "./12_自定义Hooks/App"

// import App from "./13_redux中的hooks/App"
// import App from "./14_useId的使用/App"
import App from "./15_useTransition使用/02_useDeferredValue的使用"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserContext.Provider value={{name: "why", level: 99}}>
    <TokenContext.Provider value={'coderwhy'}>
      <Provider store={store}>
        <App />
      </Provider>
    </TokenContext.Provider>
  </UserContext.Provider>
);

// root.render(
//   <UserContext.Provider value={{name: "why", level: 99}}>
//     <ThemeContext.Provider value={{color: "red", size: 30}}>
//       <App />
//     </ThemeContext.Provider>
//   </UserContext.Provider>
// );
