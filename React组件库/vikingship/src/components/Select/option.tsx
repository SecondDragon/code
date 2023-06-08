import React, { FC, useContext, ReactNode } from 'react'
import classNames from 'classnames'
import Icon from '../Icon'
import { SelectContext } from './select'
export interface SelectOptionProps {
  index?: string;
  /** 默认根据此属性值进行筛选，该值不能相同*/
  value: string;
  /** 选项的标签，若不设置则默认与 value 相同*/
  label?: string;
  /** 是否禁用该选项*/
  disabled?: boolean;
  children?: ReactNode;
}

export const Option: FC<SelectOptionProps> = ({value, label, disabled, children, index}) => {
  const { onSelect, selectedValues, multiple } = useContext(SelectContext)
  const isSelected = selectedValues.includes(value)
  const classes = classNames('viking-select-item', {
    'is-disabled': disabled,
    'is-selected': isSelected,
  })
  const handleClick = (e: React.MouseEvent, value: string, isSelected: boolean) => {
    e.preventDefault()
    if(onSelect && !disabled) {
      onSelect(value, isSelected)
    }
  }
  return (
    <li key={index} className={classes} onClick={(e) => {handleClick(e, value, isSelected)}}>
      {children || (label ? label: value)}
      {multiple && isSelected && <Icon icon="check"/>}
    </li>
  )
}

Option.displayName = 'Option'

export default Option;