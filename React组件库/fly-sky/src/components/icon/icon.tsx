import classNames from 'classnames'
import React, { FC, memo, SVGAttributes, ReactSVGElement } from 'react'
import '../../styles/font/line/iconfont'
import '../../styles/font/surface/iconfont.js'
export type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark'
interface SvgProps {
    name: string,
    className?: string,
    theme?: ThemeProps
}

export type IconProps = Partial<SvgProps & React.SVGAttributes<HTMLOrSVGElement>>

const Icon: FC<IconProps> = (props) => {
    // icon-primary
    const { className, name, theme, ...restProps } = props


    const classes = classNames('viking-icon', className, {
        [`icon-${theme}`]: theme
    })

    

    return (
        <svg className="icon"  {...restProps}  >
            <use xlinkHref={`#${name}`} ></use>
        </svg >
    )
}
Icon.defaultProps = {
    name: "yike-yikedesign"
}

export default memo(Icon)