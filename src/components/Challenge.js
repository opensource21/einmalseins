import React from 'react';
import ReactDOM from 'react-dom';

export default class Challenge extends React.Component {

    constructor(props) {
        super(props);
        this.challenge = props.challenge;
        this.result = this.challenge.factorA * this.challenge.factorB;
        this.right = this.result === this.challenge.input;
        this.active = this.challenge.time > 0;
    }

    componentDidMount() {
        if (this.active) {
            ReactDOM.findDOMNode(this.refs.nameInput).focus();
        }
    }

    renderActive() {
        const input = this.challenge.input||""
        return <div className="challenge form-inline form-group">
                <label>{this.challenge.factorA} x {this.challenge.factorB}</label> 
                <input className="form-control" type="number" name="input" size="3" min="0" max = "900"
                    ref="nameInput" value = {input} 
                    onChange = {event => this.props.inputChangeFunc(this.challenge.id, event.target.value)}/>
                <label>noch {this.challenge.time} Sekunden</label>
            </div>;
    }
    renderPassive() {
        const input = this.challenge.input||""
        const solutionText = this.right ? "!" : `richtige Lösung ${this.result}`;
        return <div className="challenge finished wrong bg-info form-inline form-group">
            <label>{this.challenge.factorA} x {this.challenge.factorB}</label> 
            <input className="form-control"  type="number" name="eingabe"  value = {input} disabled/>
            <label>{solutionText}</label>
        </div>
    }
    
    render() {
        return this.active ? this.renderActive() : this.renderPassive();
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
}
