import React from 'react';
import {isCorrect} from '../helper/ChallengeHelper';

export default function Statistic({challenges, areasize}) {
  if (challenges.length === 0) {
    return <div/>;
  }
  const stat = challenges.reduce((current, challenge) => {
    if (challenge.time === 0 && isCorrect(challenge)) {
      current.correct++;
    }
    current.total++;
    return current;
  }, {total: 0, correct: 0});
  const rate = stat.correct / areasize;
  const rateClass = getRateClass(rate);

  return <h2 className={`row text-center col-md-12 ${rateClass}`}>{stat.correct} von {stat.total} sind richtig.</h2>;
}

function getRateClass(rate) {
  if (rate > 0.7) {
    return 'bg-success';
  } else if (rate > 0.5) {
    return 'bg-info';
  } else if (rate > 0.3) {
    return 'bg-warning';
  } else {
    return 'bg-danger';
  }
}

Statistic.propTypes = {
  challenges: React.PropTypes.array.isRequired,
  areasize: React.PropTypes.number.isRequired
};
