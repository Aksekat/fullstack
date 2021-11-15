import { Diagnosis, NewPatient, Gender, NewEntry, Discharge, SickLeave, HealthCheckRating } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error('Incorrect or missing description');
  }
  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Incorrect or missing specialist');
  }
  return specialist;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }
  return ssn;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }
  return occupation;
};

const parseType = (type: unknown): string => {
  if (!type || !isString(type)) {
    throw new Error('Incorrect or missing type');
  }
  return type;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isDiagnosisCodeArray = (param: any): param is Array<Diagnosis['code']> => {
  if (Array.isArray(param) && !param.some(c => !isString(c))) {
    return true;
  }
  return false;
};

const parseDiagnosisCodes = (diagnosisCodes: unknown): Array<Diagnosis['code']> | undefined => {
  if (!diagnosisCodes) {
    return;
  } else if (!isDiagnosisCodeArray(diagnosisCodes)) {
    throw new Error('Incorrect diagnostic codes');
  }
  return diagnosisCodes;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isDischarge = (param: any): param is Discharge => {
  if ('date' in param && 'criteria' in param && isString(param.date) && isString(param.criteria)) {
    return true;
  }
  return false;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge || !isDischarge(discharge) || !discharge.date || !discharge.criteria) {
    throw new Error('Incorrect or missing discharge data');
  }
  return discharge;
};

const parseEmployerName = (employerName: unknown): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error('Incorrect or missing employer name');
  }
  return employerName;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isSickLeave = (param: any): param is SickLeave => {
  if ('startDate' in param && 'endDate' in param && isString(param.startDate) && isString(param.endDate)) {
    return true;
  }
  return false;
};

const parseSickLeave = (sickLeave: unknown): SickLeave | undefined => {
  if (!sickLeave) {
    return;
  } else if (!isSickLeave(sickLeave)) {
    throw new Error('Incorrect of missing sick leave info');
  }
  return sickLeave;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
  if (!healthCheckRating || !isHealthCheckRating(healthCheckRating)) {
    throw new Error('Incorrect of missing health check rating');
  }
  return healthCheckRating;
};


type PatientFields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown };

export const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation }: PatientFields): NewPatient => {

  const newPatient: NewPatient = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation)
  };

  return newPatient;
};

type EntryFields = { type: unknown, description: unknown, date: unknown, specialist: unknown, diagnosisCodes: unknown, discharge: unknown, employerName: unknown, sickLeave: unknown, healthCheckRating: unknown };

export const toNewEntry = ({ type, description, date, specialist, diagnosisCodes, discharge, employerName, sickLeave, healthCheckRating }: EntryFields): NewEntry => {
  const entryType = parseType(type);
  switch (entryType) {
    case "Hospital":
      return {
        type: entryType,
        description: parseDescription(description),
        date: parseDate(date),
        specialist: parseSpecialist(specialist),
        diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
        discharge: parseDischarge(discharge)
      };
    case "OccupationalHealthcare":
      return {
        type: entryType,
        description: parseDescription(description),
        date: parseDate(date),
        specialist: parseSpecialist(specialist),
        employerName: parseEmployerName(employerName),
        sickLeave: parseSickLeave(sickLeave)
      };
    case "HealthCheck":
      return {
        type: entryType,
        description: parseDescription(description),
        date: parseDate(date),
        specialist: parseSpecialist(specialist),
        healthCheckRating: parseHealthCheckRating(healthCheckRating)
      };
    default:
      throw new Error('Wrong entry type');
  }
};