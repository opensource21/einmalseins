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
                <label>{this.challenge.factorA} x {this.challenge.factorA}</label> 
                <input className="form-control" type="number" name="input" size="3" min="0" max = "900"
                    ref="nameInput" value = {input} 
                    onChange = {event => this.props.inputChangeFunc(this.challenge.id, event.target.value)}/>
                <label>noch {this.challenge.time} Sekunden</label>
            </div>;
    }
    renderPassive() {
        return <div className="challenge finished wrong bg-info form-inline form-group">
            <label>3 mal 5 =</label> <input class="form-control"  type="number" name="eingabe" value = "14" disabled/> <label>richtige Lösung 15</label>
        </div>
    }
    
    render() {
        return this.active ? this.renderActive() : this.renderPassive();
    }
}

Challenge.propTypes = {
    challenge: React.PropTypes.shape( {
        id: React.PropTypes.string.isRequired,
        factorA: React.PropTypes.number.isRequired, 
        factorB: React.PropTypes.number.isRequired,
        time: React.PropTypes.number.isRequired,
        input: React.PropTypes.number
    }).isRequired,
    inputChangeFunc: React.PropTypes.func.isRequired
}
