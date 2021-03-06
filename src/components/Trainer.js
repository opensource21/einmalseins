import React from 'react';
import Config from './Config';
import Challenge from './Challenge';
import Statistic from './Statistic';
import {random, shuffle} from '../helper/Random';
import {isNotCorrect} from '../helper/ChallengeHelper';

let challengeId = 0;

function newChallenge(a, b, time, hints = false) {
  const delta1 = random({from: -a, to: a});
  const delta2 = random({from: -b, to: b});
  const result = a * b;
  const values = hints ? [result + delta1, result + delta2, result] : [];
  if (hints) {
    shuffle(values);
  }
  return {
      id: challengeId++,
      factorA: a,
      factorB: b,
      input: null,
      time: time,
      result: result,
      hints: values
    };
}

export default class Trainer extends React.Component {
  constructor(props) {
    super(props);
    const rangeA = JSON.parse(localStorage.getItem('rangeA')) || {
            from: 13,
            to: 14
          };
    const rangeB = JSON.parse(localStorage.getItem('rangeB')) || {
            from: 11,
            to: 20
          };
    const time = JSON.parse(localStorage.getItem('time')) || 20;
    this.state = {
        rangeA: rangeA,
        rangeB: rangeB,
        time: time,
        challenges: [],
        showHint: false
      };

    this.factorChange = this.factorChange.bind(this);
    this.timeChange = this.timeChange.bind(this);
    this.start = this.start.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.countDown = this.countDown.bind(this);
    this.setHint = this.setHint.bind(this);
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

  setHint(showHint) {
    this.setState({showHint: showHint});
  }

  start(challenges) {
    localStorage.setItem('rangeA', JSON.stringify(this.state.rangeA));
    localStorage.setItem('rangeB', JSON.stringify(this.state.rangeB));
    localStorage.setItem('time', JSON.stringify(this.state.time));
    const newChallenges = [newChallenge(random(this.state.rangeA), random(this.state.rangeB), this.state.time, this.state.showHint), ...challenges];
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
              areasize= {(1 + this.state.rangeA.to - this.state.rangeA.from) *
                (1 + this.state.rangeB.to - this.state.rangeB.from)}/>
            {activeChallenge ?
              <div className="row text-center"><label>A: {this.state.rangeA.from} - {this.state.rangeA.to} und 
                    B: {this.state.rangeB.from} - {this.state.rangeB.to}  Zeit: {this.state.time}</label>
              </div>
              :
              <div>
                <h2 className="row">Konfiguration</h2>
                <Config rangeA = {this.state.rangeA} rangeB = {this.state.rangeB}
                  time = {this.state.time} timeChangeFunc = {this.timeChange}
                  rangeChangeFunc = {this.factorChange}
                  showHint={this.state.showHint} setHint={this.setHint}/>
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
