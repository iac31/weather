import React, { Component } from 'react';

class LocalTime extends Component {
    constructor() {
        super();
        this.state = {
            h: new Date().getHours(),
            m: new Date().getMinutes()
        }
    }

    getTime = () => {
        this.setState({
            h: new Date().getHours(),
            m: new Date().getMinutes(),
        })
    };

    componentDidMount() {
        setInterval((this.getTime), 500);
    }

    render() {
        return (
            <div>
                {this.state.h} : {this.state.m < 10 ? '0' + this.state.m : this.state.m}
            </div>
        )
    }

}

export default LocalTime;