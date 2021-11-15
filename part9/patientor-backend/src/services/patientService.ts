import patients from '../../data/patients';
import { NewPatient, PublicPatient, Patient, NewEntry, Entry } from '../types';
import { v1 as uuid } from 'uuid';

const getPatients = (): Patient[] => {
  return patients;
};

const getPublicPatients = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatient = (id: string): Patient | undefined => {
  const patient = patients.find(p => p.id === id);
  if(!patient) {
    throw new Error("User not found");
  }
  return patient;
};

const addPatient = (patientToAdd: NewPatient): Patient | undefined => {
  const id: string = uuid();
  const newPatient = {
    id: id,
    entries: [],
    ...patientToAdd
  };

  patients.push(newPatient);
  return newPatient;
};

const addEntry = (userId: string, entryToAdd: NewEntry): Entry | undefined => {
  const id: string = uuid();
  const patient = patients.find(p => p.id === userId);
  const newEntry = {
    id: id,
    ...entryToAdd
  };
  patient?.entries.push(newEntry);
  return newEntry;
};

export default {
  getPatients,
  getPublicPatients,
  getPatient,
  addPatient,
  addEntry
};