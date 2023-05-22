import ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import { ConfigProvider } from 'antd-mobile';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import zhCN from 'antd-mobile/es/locales/zh-CN';
import Login from './containers/Login';
import Register from './containers/Register';
import { client } from './utils/apollo';
import Home from './containers/Home';
import My from './containers/My';

import './theme.css';
import './index.css';
import StudentInfo from './components/StudentInfo';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ConfigProvider locale={zhCN}>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <StudentInfo>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/my" element={<My />} />
          </Routes>
        </StudentInfo>
      </BrowserRouter>
    </ApolloProvider>
  </ConfigProvider>,
);
