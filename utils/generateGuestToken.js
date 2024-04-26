export function generateRandomNumbers(length) {
  const startSequence = "1783737";
  const remainingLength = length - startSequence.length;
  let result = startSequence;

  for (let i = 0; i < remainingLength; i++) {
    const randomDigit = Math.floor(Math.random() * 10);
    result += randomDigit.toString();
  }

  return result;
}
