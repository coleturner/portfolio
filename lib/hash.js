export function generateIndexHash(value, denominator) {
  let sum = 0;
  for (let i = 0; i < value.length; i++) {
    sum += value.charCodeAt(i);
  }
  return sum % denominator;
}
