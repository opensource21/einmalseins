export function isCorrect(challenge) {
  return challenge.result === challenge.input;
}

export function isNotCorrect(challenge) {
  return !isCorrect(challenge);
}
