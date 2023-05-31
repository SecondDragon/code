import React from 'react';
import ReactDOM from 'react-dom';
let names = ['张三','李四','王五'];


ReactDOM.render(
  <form>
    <label htmlFor="username">用户名</label>
    <input id="username"></input>
  </form>,document.getElementById('root')
);
