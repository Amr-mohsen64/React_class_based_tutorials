import React, { Component } from 'react'

export default class ErrorBoundray extends Component {


    constructor() {
        super();
        this.state = {
            hasError: false
        }
    }

    // when you add function it make that class a error boumdary
    // triggerd when the child component s throws an error
    componentDidCatch(errObj) {
        console.log(errObj);
        this.setState({ hasError: true })
    }

    render() {
        if (this.state.hasError) {
            return <p>somthing went wrong</p>
        }

        return (
            this.props.children
        )
    }
}
