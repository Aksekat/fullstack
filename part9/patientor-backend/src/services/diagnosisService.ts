import diagnoses from '../../data/diagnoses.json';
import { Diagnosis } from '../types';


const getDiagnoses = (): Diagnosis[] => {
  return diagnoses;
};

const addEntry = () => {
  return null;
};

export default {
  getDiagnoses,
  addEntry
};