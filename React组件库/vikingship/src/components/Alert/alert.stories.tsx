import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'


import Alert from './alert'

export default { 
  title: '第四章作业：Alert 组件',
  id: 'Alert',
  component: Alert,
} as ComponentMeta<typeof Alert>

const Template: ComponentStory<typeof Alert> = (args) => <Alert {...args} />

export const ADefaultAlert = Template.bind({})
ADefaultAlert.args = {
  title: 'this is alert!'
}
ADefaultAlert.storyName = '基本样式'
export const CDescAlert = Template.bind({})
CDescAlert.args = {
  title: '提示标题欧亲',
  description: 'this is a long description'
}
CDescAlert.storyName = '带描述的 Alert'
export const BStylesAlert = () => {
  return (
    <>
      <Alert title="this is Success" type="success"></Alert>
      <Alert title="this is Danger!" type="danger"></Alert>
      <Alert title="this is Warning!" type="warning" closable={false}></Alert>
    </>
  )
}
BStylesAlert.storyName = '不同样式的 Alert'