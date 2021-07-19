import React from 'react'

let interval;

export default class Home extends React.Component {
    state = {
        time: new Date().toLocaleTimeString(),
        clickTime: 0,
    };

    componentDidMount() {
        interval = setInterval(
            () => this.setState({ time: new Date().toLocaleTimeString() }),
            1000
        );
    };

    componentWillUnmount() {
        clearInterval(interval);
    };

    async clickGame() {
        await this.setState({ clickTime: this.clickTime + 1 });
        if (this.state.clickTime % 15 === 0) {
            alert("Fizz Buzz");
        }
        else if (this.state.clickTime % 5 === 0) {
            alert("Buzz");
        }
        else if (this.state.clickTime % 3 === 0) {
            alert("Fizz");
        }
        
    }

    render() {
        return (
        <div>
            Welcome to {this.props.bootcamp}. It is {this.state.time}
            
            <button onClick={() => this.clickGame()}>Clicky Game</button>
        </div>)
    }
}
