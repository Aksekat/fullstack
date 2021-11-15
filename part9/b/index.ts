import express from 'express';
import { bmiCalculator } from './bmiCalculator';
import { exerciseCalculator } from './exerciseCalculator';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const height: any = req.query.height;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const weight: any = req.query.weight;
  if (!height || !weight) {
    res.status(400).send({ error: 'Missing parameters' });
  }
  try {
    const bmi = bmiCalculator(height, weight);
    res.json(bmi);
  } catch (error) {
    res.status(400).send({ error: 'Malformatted query' });
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment 
  const daily_exercises: any = req.body.daily_exercises;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment 
  const target: any = req.body.target;
  if (!daily_exercises || !target) {
    res.status(400).send({ error: 'Missing parameters' });
  }
  try {
    const exerciseResults = exerciseCalculator(daily_exercises, target);
    res.json(exerciseResults);
  } catch (error) {
    res.status(400).send({ error: 'Malformatted query' });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});