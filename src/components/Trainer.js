import React from 'react';
import FactorConfig from './FactorConfig'

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
                from: 1,
                to: 20
            },
            rangeB: {
                from: 1,
                to: 20
            },
            challenges: []
        };
        this.factorChange = this.factorChange.bind(this);
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

    render() {
        return <div>
        <h2>Konfiguration</h2>
        <FactorConfig factorName="A" range = {this.state.rangeA} onChangeFunc = {this.factorChange} />
        <FactorConfig factorName='B' range = {this.state.rangeB} onChangeFunc = {this.factorChange} />
        </div>
    }
}
