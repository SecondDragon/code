import React, { FC, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'
import classNames from 'classnames'
export type ButtonSize = 'lg' | 'sm' //字面量类型 我们创建了一个被称为 ButtonSize 类型，它仅接收一个字面量值为 lg 或 sm
export type ButtonType = 'primary' | 'default' | 'danger' | 'link'

interface BaseButtonProps {
    className?: string;
    /**设置 Button 的禁用 */
    disabled?: boolean;
    /**设置 Button 的尺寸 */
    size?: ButtonSize;
    /**设置 Button 的类型 */
    btnType?: ButtonType;
    children: React.ReactNode;
    loading?: boolean;
    href?: string;

}
// ButtonHTMLAttributes 这是react给我们提供的接口 & 是 交叉类型，两个都可以有 两个合并为一个
type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

const Button: FC<ButtonProps> = (props) => {
    const {
        btnType,
        className,
        disabled = true,
        size,
        children,
        href,
        loading = false,
        ...restProps } = props;
    const classes = classNames('btn', className, {
        [`btn-${btnType}`]: btnType,
        [`btn-${size}`]: size,
        'disabled': loading || ((btnType === 'link') && disabled)
    })
    console.log(classes);
    if (btnType === 'link') {
        return (
            <a
                className={classes}
                href={href}
                {...restProps}
            >
                {loading ?
                    <div className='yk-buton-name'>
                        <svg viewBox="25 25 50 50" >
                            <circle r="1" cy="1" cx="50"></circle>
                        </svg> </div> : null
                }
                {children}
            </a>
        )
    } else {
        return (
            <button
                className={classes}
                disabled={disabled}
                {...restProps}
            >
                {loading ?
                    <div className='yk-buton-name'>
                        <svg viewBox="25 25 50 50" >
                            <circle r="20" cy="50" cx="50"></circle>
                        </svg> </div> : null
                }
                {children}
            </button>
        )
    }

}
Button.defaultProps = {
    disabled: false,
    btnType: 'default',
    // size: 'sm'
}


export default Button
