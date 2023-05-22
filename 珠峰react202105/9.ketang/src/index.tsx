import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './style/common.less';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { ConfigProvider, Spin } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import Tabs from './components/Tabs';
import { ConnectedRouter } from 'connected-react-router';
import history from './store/history';
import { PersistGate } from 'redux-persist/integration/react'
const Home = React.lazy(() => import('./routes/Home'));
const Cart = React.lazy(() => import('./routes/Cart'));
const Profile = React.lazy(() => import('./routes/Profile'));
const Login = React.lazy(() => import('./routes/Login'));
const Register = React.lazy(() => import('./routes/Register'));
const Detail = React.lazy(() => import('./routes/Detail'));


ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={<Spin />} persistor={persistor}>
            <ConnectedRouter history={history}>
                <ConfigProvider locale={zh_CN}>
                    <Suspense fallback={<Spin />}>
                        <main className="main-container">
                            <Switch>
                                <Route path="/" exact component={Home} />
                                <Route path="/cart" component={Cart} />
                                <Route path="/profile" component={Profile} />
                                <Route path="/login" component={Login} />
                                <Route path="/register" component={Register} />
                                <Route path="/detail/:id" component={Detail} />
                                <Redirect to="/" />
                            </Switch>
                        </main>
                    </Suspense>
                    <Tabs />
                </ConfigProvider>
            </ConnectedRouter>
        </PersistGate>
    </Provider>
    , document.getElementById('root'));