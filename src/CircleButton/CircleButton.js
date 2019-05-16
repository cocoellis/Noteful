import React from 'react'
import './CircleButton.css'

import Proptypes from 'prop-types'

export default function NavCircleButton(props) {
    const { tag, className, children, ...otherProps } = props

    return React.createElement(
        props.tag,
        {
            className: ['NavCircleButton', props.className].join(' '),
            ...otherProps
        },
        props.children
    )
}

NavCircleButton.defaultProps = {
    tag: 'a',
}

NavCircleButton.propTypes = {
    tag: Proptypes.oneOfType([
        Proptypes.string,
        Proptypes.func
    ]),
    className: Proptypes.string.isRequired,
    children: Proptypes.array.isRequired,
    otherProps: Proptypes.node
}