import React from 'react'

export default class Home extends React.Component {
    componentDidMount() {
        console.log('did mount');
    };

    componentWillUnmount() {
        console.log('will unmount');
    };

    render() {
        return (
        <div>

        </div>
        )
    }
}
