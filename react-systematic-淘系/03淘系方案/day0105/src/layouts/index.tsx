import { NavLink, Outlet } from 'umi';
import styled from 'styled-components';

/* 样式 */
const StyleLayoutBox = styled.div`
  padding: 20px;
  .nav-box{
    height: 50px;
    border-bottom: 1px solid #DDD;

    a{
      margin-right: 15px;
      line-height: 50px;
      color: #000;
      font-size: 18px;

      &.active{
        color: red;
      }
    }
  }
`;

export default function Layout() {
  return <StyleLayoutBox>
    <nav className='nav-box'>
      <NavLink to="/">首页</NavLink>
      <NavLink to="/demo/100">测试页</NavLink>
      <NavLink to="/personal">个人中心</NavLink>
    </nav>
    <Outlet />
  </StyleLayoutBox>;
};