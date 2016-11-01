import React from 'react';
import Config from './Config'
import Challenge from './Challenge'

function newChallenge(a, b, time) {
  return {
    id:    `challenge_${Date.now()}`,
    factorA: a,
    factorB: b,
    input: null,
    time: time
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
        this.start = this.start.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.state.challenges = [newChallenge(3, 5, this.state.time)];
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

    start() {
        const newChallenges = [newChallenge(3, 5, this.state.time), ...this.state.challenges];
        this.setState({challenges: newChallenges});
    }

    inputChange(id, value) {
        const newChallenges = this.state.challenges.map((c)=>c.id !== id ? c : { ...c, input : parseInt(value), id = Date.now()});
        this.setState({challenges: newChallenges});
    }

    render() {
        const list = this.state.challenges.map((challenge) => console.log(challenge));
        return <div>
            <h2 className="row">Konfiguration</h2>
            <Config rangeA = {this.state.rangeA} rangeB = {this.state.rangeB} 
                time = {this.state.time} timeChangeFunc = {this.timeChange} 
                rangeChangeFunc = {this.factorChange}/>
            <div className="form-group row col-md-12">
                <button className="btn btn-primary col-md-12" onClick={this.start}>Start</button>
            </div>
            {this.state.challenges.map((challenge) => <Challenge key = {challenge.id} challenge = {challenge} inputChangeFunc = {this.inputChange} />)}
        </div>
        
    }
}
