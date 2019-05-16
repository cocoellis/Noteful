import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class ErrorBounds extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hasError: false
        }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true }
    }
    render() {
        if (this.state.hasError) {
            return <h2>Sorry, Couldn't Conntect to Noteful Server :(</h2>;
        }
        return this.props.children;
    }
}
ErrorBounds.propTypes = {
    children: PropTypes.node.isRequired
}