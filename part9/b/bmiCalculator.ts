interface HeightAndWeigth {
  height: number;
  weight: number;
}

interface BmiObject {
  height: number;
  weight: number;
  bmi: string;
}

const parseArguments = (height: string, weight: string): HeightAndWeigth => {

  if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
    return {
      height: Number(height),
      weight: Number(weight)
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

const calculateBmi = (height: number, weight: number): string => {
  const bmi: number = weight / ((height / 100) ** 2);
  if (bmi > 30) {
    return 'Obese';
  } else if (bmi > 25) {
    return 'Overweight';
  } else if (bmi >= 18.5) {
    return 'Normal (healthy weight)';
  } else {
    return 'Underweight';
  }
};

export const bmiCalculator = (argHeight: string, argWeight: string): BmiObject => {
  try {
    const { height, weight } = parseArguments(argHeight, argWeight);
    return ({
      height: height,
      weight: weight,
      bmi: calculateBmi(height, weight)
    });
  } catch (e) {
    throw new Error('Malformatted query');
  }
};