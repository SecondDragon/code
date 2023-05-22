import React from "react";
import { HashRouter } from 'react-router-dom';
import HomeHead from './components/HomeHead';
import RouterView from "./router";

const App = function App() {
    return <HashRouter>
        <HomeHead />
        <div className="content">
            <RouterView />
        </div>
    </HashRouter>;
};

/* 
import { useRoutes, Navigate } from 'react-router-dom';
import A from './views/A';
import A1 from './views/a/A1';

const App = function App() {
    const element = useRoutes([{
        path: '/',
        element: <Navigate to="/a" />
    }, {
        path: '/a',
        element: <A />,
        children: [{
            path: '/a',
            element: <Navigate to="/a/a1" />
        }, {
            path: '/a/a1',
            element: <A1 />,
        }]
    }]);
    return <>
        <HomeHead />
        {element}
    </>;
};
*/
export default App;