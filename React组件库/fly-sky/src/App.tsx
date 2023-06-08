import React from 'react';
import Button from './components/Button/button';
import Icon from './components/icon';
function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Button loading autoFocus>hell0</Button>

        <Button loading className='custom'  autoFocus><Icon style={{marginRight:"0.5em"}}  name="yike-xin"></Icon>hell0</Button>
        <Button size='sm' disabled>Disable Button</Button>
        <Button btnType='primary' size='lg' >Large Primary</Button>
        <Button btnType='danger' size='lg' >Small Danger</Button>
        <Button size='lg' btnType='link' >Baidu Link</Button>
        <Button size='lg' btnType='link' disabled >Disabled Link</Button>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
