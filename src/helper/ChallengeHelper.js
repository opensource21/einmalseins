export function isCorrect(challenge) {
  return challenge.factorA * challenge.factorB === challenge.input;
}

export function isNotCorrect(challenge) {
  return !isCorrect(challenge);
}
