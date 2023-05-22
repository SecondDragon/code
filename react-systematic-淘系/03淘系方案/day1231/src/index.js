import dva from 'dva';
import { createHashHistory } from 'history';
import voteModel from './models/vote';
import createLoading from 'dva-loading';
// import createLogger from 'redux-logger';

// 1. Initialize
const app = dva({
    // 指定路由的模式，默认是哈希路由：createHashHistory/createBrowserHistory
    history: createHashHistory(),
    // 扩展其他的中间件，例如：redux-logger/redux-persist等
    extraEnhancers: [],
    // 在每一次派发中进行拦截
    // onAction: createLogger()
});
window.app = app;

// 2. Plugins
app.use(createLoading());

// 3. Model
app.model(voteModel);

// 4. Router
app.router(require('./router').default);

// 5. Start 在这之前一定要先处理router
app.start('#root');