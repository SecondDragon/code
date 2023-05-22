import styled from "styled-components"
import {
  primaryColor,
  largeSize
} from "./style/variables"

// 1.基本使用
export const AppWrapper = styled.div`
  .footer {
    border: 1px solid orange;
  }
`

// const obj = {
//   name: (props) => props.name || "why"
// }


// 2.子元素单独抽取到一个样式组件
// 3.可以接受外部传入的props
// 4.可以通过attrs给标签模板字符串中提供的属性
// 5.从一个单独的文件中引入变量
export const SectionWrapper = styled.div.attrs(props => ({
  tColor: props.color || "blue"
}))`
  border: 1px solid red;

  .title {
    font-size: ${props => props.size}px;
    color: ${props => props.tColor};

    &:hover {
      background-color: purple;
    }
  }

  .content {
    font-size: ${largeSize}px;
    color: ${primaryColor};
  }
`
