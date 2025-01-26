import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (!height || !weight) {
    return res.status(400).send({ error: "Malformatted parameters" });
  }

  const bmi = calculateBmi(height, weight);
  return res.send({
    height,
    weight,
    bmi,
  });
});

app.post("/exercises", (req, res) => {
  //eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    return res.status(400).send({ error: "parameters missing" });
  }

  if (isNaN(Number(target))) {
    return res.status(400).send({ error: "malformatted parameters" });
  }

  // eslint-disable-next-line, @typescript-eslint/no-unsafe-member-access
  for (const value of daily_exercises) {
    if (isNaN(Number(value))) {
      return res.status(400).send({ error: "malformatted parameters" });
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
  const daily_exercises_numbers = daily_exercises.map((value: unknown) =>
    Number(value)
  );

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = calculateExercises(target, daily_exercises_numbers);
  return res.send({ result });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//tehtävä 9.7 tehty
