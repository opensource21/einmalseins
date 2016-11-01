import React from 'react';
import Config from './Config'

function newChallenge(a, b) {
  return {
    id:    `challenge_${Date.now()}`,
    factorA: a,
    factorB: b,
    input: ""
  };
}

export default class Trainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rangeA: {
                from: 2,
                to: 20
            },
            rangeB: {
                from: 2,
                to: 20
            },
            time: 20,
            challenges: []
        };
        this.factorChange = this.factorChange.bind(this);
        this.timeChange = this.timeChange.bind(this);
    }

    factorChange(factorName, fieldName, value) {
        const completeFactorName = `range${factorName}`
        const currentRange = this.state[completeFactorName]; 
        const newRange = {...currentRange};
        //Set the new value
        newRange[fieldName] = parseInt(value, 10);
        this.setState({
            [completeFactorName]: newRange
        });
    }

    timeChange(time) {
        this.setState({time: parseInt(time)});
    }

    render() {
        return <div>
        <h2 className="row">Konfiguration</h2>
        <Config rangeA = {this.state.rangeA} rangeB = {this.state.rangeB} 
            time = {this.state.time} timeChangeFunc = {this.timeChange} 
            rangeChangeFunc = {this.factorChange}/>
        </div>
    }
}
