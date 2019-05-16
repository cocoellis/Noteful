import React from 'react'
import './NotefulForm.css'

/* Prop-Types */
import PropTypes from 'prop-types'

export default function NotefulForm(props) {
    const { className, ...otherProps } = props
    return (
        <form
            className={['Noteful-form', className].join(' ')}
            action='#'
            {...otherProps}
        />
    )
}

NotefulForm.propTypes = {
    className: PropTypes.string.isRequired,
    otherProps: PropTypes.node
}
