export default function random(range) {
    const max = range.to + 1;
    const min = range.from;
    return Math.floor(Math.random() * (max + 1 - min) + min);
}