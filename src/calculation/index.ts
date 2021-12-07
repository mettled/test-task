type CalcType = {
  [key: string]: (a: number, b: number) => number;
};

const calculation: CalcType = {
  multiplication: (a, b) => a * b,
  remainder: (a, b) => a % b,
  division: (a, b) => a / b,
  subtraction: (a, b) => a - b,
  addition: (a, b) => a + b,
};

export default calculation;
