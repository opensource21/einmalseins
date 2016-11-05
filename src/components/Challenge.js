import React from "react";
import ReactDOM from "react-dom";

export default class Challenge extends React.Component {

    componentDidMount() {
        if (this.isActive()) {
            ReactDOM.findDOMNode(this.refs.nameInput).focus();
        }
    }

    isActive() {
        return this.props.challenge.time > 0;
    }

    renderActive() {
        const challenge = this.props.challenge;

        return <div className="challenge form-inline form-group">
                <label>{challenge.factorA} x {challenge.factorB}</label> 
                <input className="form-control" type="number" name="input" size="3" min="0" max = "900"
                    ref="nameInput"
                    onChange = {event => this.props.inputChangeFunc(challenge.id, event.target.value)}/>
                <label>noch {this.props.challenge.time} Sekunden</label>
            </div>;
    }

    renderPassive() {
        const challenge = this.props.challenge; 
        const result = challenge.factorA * challenge.factorB;
        const input = challenge.input || 0;

        if (result === input) {
            return (
                <div className = "right bg-success">
                    Richtig, <b>{challenge.factorA}</b> x <b>{challenge.factorB}</b> = <b>{result}</b>
                </div>);
        } 
        else {
            return (
                <div className = "wrong bg-info">
                    Nicht ganz, <b>{challenge.factorA}</b> x <b>{challenge.factorB}</b> = <b>{result}</b> und nicht <b>{input}</b>
                </div>);
        }
    }
    
    render() {
        return this.isActive() ? this.renderActive() : this.renderPassive();
    }
}

Challenge.propTypes = {
    challenge: React.PropTypes.shape( {
        id: React.PropTypes.number.isRequired,
        factorA: React.PropTypes.number.isRequired, 
        factorB: React.PropTypes.number.isRequired,
        time: React.PropTypes.number.isRequired,
        input: React.PropTypes.number
    }).isRequired,
    inputChangeFunc: React.PropTypes.func.isRequired
};
