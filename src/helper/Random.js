export function random(range) {
  const max = range.to + 1;
  const min = range.from;
  return Math.floor(Math.random() * (max - min) + min);
}

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items The array containing the items.
 */
export function shuffle(a) {
  for (let i = a.length; i; i--) {
    let j = Math.floor(Math.random() * i);
    [a[i - 1], a[j]] = [a[j], a[i - 1]];
  }
}
