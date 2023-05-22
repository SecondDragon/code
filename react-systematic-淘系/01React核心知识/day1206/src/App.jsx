import React from "react";
import Nav from "./views/Nav";
import Menu from "./views/Menu";
// import Demo from "./views/Demo";

const App = function App() {
    return <div className="home-box">
        <Nav />
        <Menu />
        {/* <Demo x={10} y={20} enable={true} /> */}
    </div>;
};

export default App;