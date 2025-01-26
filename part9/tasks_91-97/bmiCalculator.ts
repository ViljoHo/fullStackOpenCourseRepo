interface BmiNumbers {
  height: number;
  weight: number;
}

const parseArguments = (args: string[]): BmiNumbers => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

export const calculateBmi = (height: number, weight: number) => {
  const heightToMeters = height / 100;

  const result = weight / (heightToMeters * heightToMeters);

  if (result < 18.5) {
    return "underweight";
  } else if (result >= 18.5 && result < 25) {
    return "Normal range";
  } else if (result >= 25 && result < 30) {
    return "Overweight";
  } else {
    return "Obese";
  }
};

if (require.main === module) {
  try {
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
  } catch (error: unknown) {
    let errorMessage = "Something bad happened";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
  }
}
