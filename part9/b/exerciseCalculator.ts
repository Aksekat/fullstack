interface ResultObject {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const validateArguments = (hoursPerDay: Array<number>, target: number): void => {
  if (hoursPerDay.some(hours => isNaN(hours) || isNaN(target))) {
    throw new Error('Provided values were not numbers!');
  }
};

const calculateExcercises = (hoursPerDay: Array<number>, target: number): ResultObject => {
  let sumOfHours = 0;
  let trainingDays = 0;

  hoursPerDay.forEach(hours => {
    if (hours > 0) {
      sumOfHours += hours;
      ++trainingDays;
    }
  });

  const average: number = sumOfHours / hoursPerDay.length;
  const success: boolean = average >= target ? true : false;
  let rating: number;
  let ratingDescription: string;

  if (average > target) {
    rating = 3;
    ratingDescription = 'Good job!';
  } else if (average + 0.5 >= target) {
    rating = 2;
    ratingDescription = 'Not too bad but could be better';
  } else {
    rating = 1;
    ratingDescription = 'Not good, try to do better';
  }

  return {
    periodLength: hoursPerDay.length,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average
  };
};

export const exerciseCalculator = (argHours: Array<number>, argTarget: number) => {
  validateArguments(argHours, argTarget);
  return calculateExcercises(argHours, argTarget);
};
