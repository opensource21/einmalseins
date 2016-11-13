import React from 'react';
import Config from './Config';
import Challenge from './Challenge';
import Statistic from './Statistic';
import random from '../helper/Random';
import {isNotCorrect} from '../helper/ChallengeHelper';

let challengeId = 0;

function newChallenge(a, b, time) {
  return {
      id: challengeId++,
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
            from: 13,
            to: 14
          },
        rangeB: {
            from: 11,
            to: 20
          },
        time: 20,
        challenges: []
      };

    this.factorChange = this.factorChange.bind(this);
    this.timeChange = this.timeChange.bind(this);
    this.start = this.start.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  factorChange(factorName, fieldName, value) {
    const completeFactorName = `range${factorName}`;
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
    const newChallenges = [newChallenge(random(this.state.rangeA), random(this.state.rangeB), this.state.time), ...challenges];
    this.setState({challenges: newChallenges});
    clearInterval(this.interval);
    this.interval = setInterval(() => this.countDown(), 1000);
  }

  countDown() {
    let totalChangeTime = 0;
    const newChallenges = this.state.challenges.map((c)=> {
        if (c.time === 0) {
          return c;
        } else {
          totalChangeTime += c.time - 1;
          return {...c, time: c.time - 1};
        }});

    if (totalChangeTime === 0) {
      clearInterval(this.interval);
      if (newChallenges[0].input > 0 && newChallenges.filter(isNotCorrect).length < 3) {
        return this.start(newChallenges);
      } else if (!newChallenges[0].input > 0) {
        // Remove the last try if no input happend
        newChallenges.shift();
      }
    }
    this.setState({challenges: newChallenges});
  }

  inputChange(id, value) {
    const newChallenges = this.state.challenges.map((c)=>c.id !== id ? c : {...c, input: parseInt(value)});
    this.setState({challenges: newChallenges});
  }

  render() {
    // const list = this.state.challenges.map((challenge) => console.log(challenge));
    const activeChallenge = this.state.challenges.some(challenge => challenge.time > 0);

    return <div>
            <Statistic challenges = {this.state.challenges}
              areasize= {(this.state.rangeA.to - this.state.rangeA.from) * (this.state.rangeB.to - this.state.rangeB.from)}/>
            {activeChallenge ?
              <div className="row text-center"><label>A: {this.state.rangeA.from} - {this.state.rangeA.to} und 
                    B: {this.state.rangeB.from} - {this.state.rangeB.to}  Zeit: {this.state.time}</label>
              </div>
              :
              <div>
                <h2 className="row">Konfiguration</h2>
                <Config rangeA = {this.state.rangeA} rangeB = {this.state.rangeB}
                  time = {this.state.time} timeChangeFunc = {this.timeChange}
                  rangeChangeFunc = {this.factorChange}/>
                <div className="form-group row col-md-12">
                <button className="btn btn-primary col-md-12 {activeChallenge ? 'disabled' : ''}" disabled={activeChallenge}
                  onClick={activeChallenge ? null : () => this.start([])}>Start</button>
                </div>
                <p/></div>
            }
            {this.state.challenges.map((challenge) => <Challenge key={challenge.id} challenge = {challenge} inputChangeFunc = {this.inputChange} />)}
        </div>;
  }
}
