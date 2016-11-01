import React from 'react';
import Config from './Config'
import Challenge from './Challenge'

let challengeId = 0;

function newChallenge(a, b, time) {
  return {
    id:    challengeId++,
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
            time: 5,
            challenges: []
        };
        this.factorChange = this.factorChange.bind(this);
        this.timeChange = this.timeChange.bind(this);
        this.start = this.start.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.countDown = this.countDown.bind(this);
        this.state.challenges = [];
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

    start(challenges) {
        const newChallenges = [newChallenge(3, 5, this.state.time), ...challenges];
        this.setState({challenges: newChallenges});
        clearInterval(this.interval);
        this.interval = setInterval(() => this.countDown(), 1000);
    }

    countDown() {
        let totalChangeTime = 0;
        const newChallenges = this.state.challenges.map((c)=>{
            if (c.time === 0) {
                return c;
            } else {
                totalChangeTime += c.time - 1;;
                return { ...c, time : c.time - 1 , id : challengeId++ }
            }});
        if (totalChangeTime === 0) {
            clearInterval(this.interval);
            if (newChallenges[0].input > 0 && newChallenges.filter(c => c.factorA * c.factorB !== c.input).length < 3) {
                return this.start(newChallenges);
            }
        } 
        this.setState({challenges: newChallenges});
    }

    inputChange(id, value) {
        const newChallenges = this.state.challenges.map((c)=>c.id !== id ? c : { ...c, input : parseInt(value), id : challengeId++});
        this.setState({challenges: newChallenges});
    }

    render() {
        const list = this.state.challenges.map((challenge) => console.log(challenge));
        const activeChallenge = this.state.challenges.some(challenge => challenge.time > 0);
        return <div>
            <h2 className="row">Konfiguration</h2>
            <Config rangeA = {this.state.rangeA} rangeB = {this.state.rangeB} 
                time = {this.state.time} timeChangeFunc = {this.timeChange} 
                rangeChangeFunc = {this.factorChange}/>
            <div className="form-group row col-md-12">
                <button className="btn btn-primary col-md-12 {activeChallenge ? 'disabled' : ''}" disabled={activeChallenge} 
                    onClick={activeChallenge ? null : () => this.start([])}>Start</button>
            </div>
            {this.state.challenges.map((challenge) => <Challenge key = {challenge.id} challenge = {challenge} inputChangeFunc = {this.inputChange} />)}
        </div>
        
    }
}
