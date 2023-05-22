import React from "react";
import { HashRouter } from 'react-router-dom';
import RouterView from "./router";
import routes from "./router/routes";
import HomeHead from "./components/HomeHead";

const App = function App() {
    return <HashRouter>
        <HomeHead />

        {/* 路由容器 */}
        <div className="content">
            <RouterView routes={routes} />
        </div>
    </HashRouter>;
};

export default App;