import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux"
import { StoreContext } from "./hoc"
import App from './App';
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <StoreContext.Provider value={store}>
        <App />
      </StoreContext.Provider>
    </Provider>
  // </React.StrictMode>
);
