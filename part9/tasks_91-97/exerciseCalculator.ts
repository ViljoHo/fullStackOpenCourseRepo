interface ArgsValues {
  target: number;
  hours: number[];
}

interface ExercisesResults {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const ratings: { [key: number]: string } = {
  1: "absolutely disaster! Not even trying",
  2: "not too bad but could be better",
  3: "unbelievable! Good work!",
};

const parseArguments = (args: string[]): ArgsValues => {
  if (args.length < 4) throw new Error("Not enough numbers");

  args.slice(3).forEach((value) => {
    if (isNaN(Number(value))) {
      throw new Error("All arguments have to be numbers");
    }
  });

  return {
    target: Number(args[2]),
    hours: args.slice(3).map(Number),
  };
};

export const calculateExercises = (
  target: number,
  hours: number[]
): ExercisesResults => {
  const periodLength = hours.length;

  const trainingDays = hours.filter((h) => h > 0).length;

  const average =
    hours.reduce((sum, current) => sum + current, 0) / hours.length;

  const success = average > target ? true : false;

  const ratingPercentage = average / target;

  let rating = 0;

  if (ratingPercentage < 0.5) {
    rating = 1;
  } else if (ratingPercentage > 0.5 && ratingPercentage < 1) {
    rating = 2;
  } else if (ratingPercentage > 1) {
    rating = 3;
  }

  const ratingDescription = ratings[rating];

  return {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: Number(target),
    average: average,
  };
};

if (require.main === module) {
  try {
    const { target, hours } = parseArguments(process.argv);
    console.log(calculateExercises(target, hours));
  } catch (error) {
    let errorMessage = "Something bad happened";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
  }
}
