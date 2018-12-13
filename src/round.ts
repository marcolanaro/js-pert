export const PRECISION = 3;

const round = (number: number, precision: number) => {
  const factor = Math.pow(10, precision);
  const tempNumber = number * factor;
  return Math.round(tempNumber) / factor;
};

export default round;
